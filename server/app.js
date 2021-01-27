/*!

=========================================================
* app.js
=========================================================

* Defines socket logic for core app functionality
* Includes all business logic for all

=========================================================
*/
const auth = require("./auth")
const { getStudent } = require("./students")
const { v1: uuidv1 } = require('uuid');

/* 
 * Constants
 */
const SYSTEM_MESSAGES = {
    OTHER_DISCONNECTED: "OTHER_DISCONNECTED",
    OTHER_RECONNECTED: "OTHER_RECONNECTED",
    NO_LOGIN: "NO_LOGIN",
    ALREADY_CONNECTED: "ALREADY_CONNECTED"
}

const MATCH_MODE = {
    ANYONE: 0,
    CLASS: 1,
    MAJOR: 2,
    RES_COLLEGE: 3,
}

/*
 * State variables
 */
var ROOM_ID_COUNTER = 0
// map of room_id -> message list
const messages = new Map()

// mapping of netid -> {socket, room_id}
const connections = new Map()

// mapping of room_id -> pair of users and revealed set
const rooms = new Map()

// queue of people waiting to be connected
// mapping of netid -> {netid, match_mode, profile, user_id}
var match_queue = new Map()

/*
 * Core business logic
 */

// triggered when client requests a match
const onFindMatch = (io, socket, match_mode) => {
    var netid = auth.getNetid(socket.request)
    console.log(`Init match from ${netid} in mode ${match_mode}`);

    // if already in queue, remove
    if (match_queue.has(netid)) {
        console.log(`Dequeued match profile ${JSON.stringify(match_queue.get(netid))}`)
        match_queue.delete(netid)
    }

    // represents user and what they are matching for 
    var matchProfile = {
        netid: netid,
        match_mode: match_mode,
        profile: getStudent(netid)
    }

    if (matchProfile.profile == null) {
        console.error(`${netid} tried to match in mode ${match_mode} with empty profile. Setting to [ANYONE]`)
        matchProfile.match_mode = MATCH_MODE.ANYONE
    }

    // on a new init match, scan through the current queue and check for match criteria
    // linear scan, probably fine

    const keys = Array.from(match_queue.keys());
    for (var i = 0; i < keys.length; i++) {
        const key = keys[i]
        const mp_b = match_queue.get(key)

        if (isMatch(matchProfile, mp_b)) {
            // remove from queue
            console.log(`Matching profiles ${JSON.stringify(matchProfile)} & ${JSON.stringify(mp_b)}`)
            matchUsers(io, netid, mp_b.netid)
            return
        }
    }

    // no match found
    console.log(`Put match profile into queue ${JSON.stringify(matchProfile)}`)
    match_queue.set(netid, matchProfile)
}

// remove user from queue (if they are currently matching)
const cancelMatch = (netid) => {
    // remove user if they are queued to match
    if (match_queue.has(netid)) {
        console.log(`Removing ${netid} from the match queue`);
        match_queue.delete(netid)
    }
}

// checks two matchProfiles and returns true iff criteria is met for both people
function isMatch(mp_a, mp_b) {
    // return true IFF a accepts b (vice versa is not guaranteed)
    function oneWayMatch(_mp_a, _mp_b) {
        if (_mp_a.match_mode === MATCH_MODE.ANYONE) {
            return true;
        }
        // invariant: profile will be defined for _mp_a at this point
        if (_mp_b.profile === null) {
            return false;
        }

        switch (_mp_a.match_mode) {
            case MATCH_MODE.CLASS:
                return _mp_a.profile['class_year'] === _mp_b.profile['class_year']
            case MATCH_MODE.MAJOR:
                return _mp_a.profile['major_code'] === _mp_b.profile['major_code']
            case MATCH_MODE.RES_COLLEGE:
                return _mp_a.profile['res_college'] === _mp_b.profile['res_college']
            default:
                console.log(`Invalid match_mode: ${_mp_a.MATCH_MODE}`)
                return false
        }
    }

    // match if both match with each other
    if (oneWayMatch(mp_a, mp_b) && oneWayMatch(mp_b, mp_a)) {
        return true;
    }
    return false;
}

// matches two users together and creates a new room
function matchUsers(io, netid_a, netid_b) {
    // tell each other that they've matched
    data_a = connections.get(netid_a)
    data_b = connections.get(netid_b)

    // check invariants
    if (data_a === undefined) {
        console.error(`No connection found for ${netid_a}`)
        return;
    }
    if (data_b === undefined) {
        console.error(`No connection found for ${netid_b}`)
        return;
    }
    if (data_a.room_id != -1) {
        console.error(`${netid_a} is already in room ${data_a.room_id}`)
        return;
    }
    if (data_b.room_id != -1) {
        console.error(`${netid_a} is already in room ${data_b.room_id}`)
        return;
    }

    // TODO: make a better room counter
    room_id = ROOM_ID_COUNTER

    data_a.socket.join(room_id)
    data_b.socket.join(room_id)
    data_a.room_id = room_id
    data_b.room_id = room_id

    messages.set(room_id, [])

    io.to(room_id).emit("match")
    rooms.set(room_id, { netid_a: netid_a, netid_b: netid_b, revealed: new Set() })
    ROOM_ID_COUNTER += 1

    console.log(`Matched users ${netid_a} and ${netid_b}, sent to room ${room_id}`)

    // remove from match queue
    cancelMatch(netid_a)
    cancelMatch(netid_b)
}

// returns whether or not to terminate connection
const onSocketConnect = (io, socket, netid) => {
    var netid = auth.getNetid(socket.request)
    io.emit('totalCount', connections.size)
    // terminate if not logged in
    if (!netid) {
        socket.emit("system", SYSTEM_MESSAGES.NO_LOGIN)
        return true
    }

    // terminate if socket connection already exists
    if (connections.has(netid)) {
        socket.emit("system", SYSTEM_MESSAGES.ALREADY_CONNECTED)
        
        
        return true
    }

    // generate user uuid
    var user_id = uuidv1();

    // store connection 
    connections.set(netid, { socket: socket, room_id: -1, user_id: user_id })

    // send the user's profile to themselves
    // TODO: consider whether this is necessary!
    var profile = getStudent(netid);
    console.log("Sending profile: " + JSON.stringify(profile))
    socket.emit("profile", profile)
    socket.emit("user_id", user_id)
    console.log(`A user connected with netid ${netid}, user_id ${user_id}`)
    console.log('Number of users: ', connections.size)
    io.emit('totalCount',connections.size)
    return false
}

const onSocketDisconnect = (io, socket, netid) => {
    var netid = auth.getNetid(socket.request)
    // remove user if they are queued to match
    if (match_queue.has(netid)) {
        match_queue.delete(netid)
    }
    if (connections.has(netid)) {
        var conn = connections.get(netid)
        // if user is in room, broadcast to partner that they have disconnected
        var room_id = conn.room_id
        if (room_id !== -1) {
            console.log(`Broadcasting to room ${room_id} that ${netid} has disconnected`)
            io.to(room_id).emit('system', SYSTEM_MESSAGES.OTHER_DISCONNECTED)
        }
        connections.delete(netid)
    }
    console.log(`User ${netid} has disconnected`);
    console.log('Number of users: ', connections.size)
}

const onMessage = (io, socket, msg) => {
    var netid = auth.getNetid(socket.request)

    // TODO: check if valid
    // get which room that user was in
    var room_id = connections.get(netid).room_id
    var user_id = connections.get(netid).user_id

    msg.id = uuidv1();
    console.log(`Received message ${msg.id} from ${netid} in room ${room_id}`);

    // check that user_ids match
    if (user_id !== msg.user_id) {
        console.warn(`User supplied user_id invalid: ${user_id}, ${msg.user_id}`)
    }

    // save message in memory
    messages.get(room_id).push(msg)

    // emits to all connected sockets in that room
    io.to(room_id).emit('message', msg);
}

const onImTyping = (io, socket, is_typing) => {
    // broadcast to the room 
    var netid = auth.getNetid(socket.request)

    // TODO: check if valid
    // get which room that user was in
    var room_id = connections.get(netid).room_id
    var user_id = connections.get(netid).user_id

    // emits to all connected sockets in that room
    io.to(room_id).emit('is-typing', { user_id, is_typing });
}

// handle revealing (either add or remove from reveal list)
const onElectReveal = (io, socket, doReveal) => {
    var netid = auth.getNetid(socket.request)

    // TODO: check if valid
    // get which room that user was in
    var room_id = connections.get(netid).room_id

    var room = rooms.get(room_id)

    if (doReveal) {
        room.revealed.add(netid)
        console.log(`${netid} has elected to reveal in room ${room_id}`);
    } else {
        room.revealed.delete(netid)
        console.log(`${netid} has no longer elected to reveal in room ${room_id}`);
    }

    // check if there both have elected to reveal
    if (room.revealed.size == 2) {
        // reveal to both parties
        var socketA = connections.get(room.netid_a).socket
        var socketB = connections.get(room.netid_b).socket

        // send net_ids over
        socketA.emit('reveal', room.netid_b)
        socketB.emit('reveal', room.netid_a)
    }
}

function returnNumUsers(){
    return connections.size;
}

/*
 * Define core socket hooks
 */

function registerSocketHooks(io) {

    // define handler functions for each event
    io.on('connection', ((socket) => {
        var terminate = onSocketConnect(io, socket)
        if (terminate) {
            socket.disconnect()
            return
        }

        // handle disconnection
        socket.on('disconnect', () => {
            onSocketDisconnect(io, socket)
            
        });

        socket.on('find-match', (match_mode) => {
            onFindMatch(io, socket, match_mode);
        });

        socket.on('cancel-match', () => {
            cancelMatch(auth.getNetid(socket.request));
        });

        socket.on('elect-reveal', (doReveal) => {
            onElectReveal(io, socket, doReveal);
        });

        socket.on('message', (msg) => {
            onMessage(io, socket, msg)
        });

        socket.on('im-typing', (is_typing) => {
            onImTyping(io, socket, is_typing);
        });
    }).bind(io));
}

module.exports = { registerSocketHooks };