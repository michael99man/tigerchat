/*!

=========================================================
* app.js
=========================================================

* Defines socket logic for core app functionality

=========================================================
*/
const auth = require("./auth")

const SYSTEM_MESSAGES = {
    OTHER_DISCONNECTED: "OTHER_DISCONNECTED",
    OTHER_RECONNECTED: "OTHER_RECONNECTED",
    NO_LOGIN: "NO_LOGIN",
    ALREADY_CONNECTED: "ALREADY_CONNECTED"
}
  
/* 
 * State variables
 */

var ROOM_ID_COUNTER = 0
// map of room_id -> message list
const messages = new Map()

// mapping of each connected netid to the associated socket and room
const connections = new Map()

// mapping of room_id -> pair of users
const rooms = new Map()

// queue of people waiting to be connected
var in_search = []

function checkForMatch(io) {
    if (in_search.length >= 2) {
        // pop the first two and hook them up
        var userA = in_search.shift();
        var userB = in_search.shift();

        // tell each other that they've matched
        dataA = connections.get(userA)
        dataB = connections.get(userB)

        room_id = ROOM_ID_COUNTER
        dataA.socket.join(room_id)
        dataB.socket.join(room_id)
        dataA.room_id = room_id
        dataB.room_id = room_id

        messages.set(room_id, [])

        io.to(room_id).emit("match")
        rooms.set(room_id, { userA: userA, userB: userB })
        ROOM_ID_COUNTER += 1

        console.log(`Matched users ${userA} and ${userB}, sent to room ${room_id}`)
    }
}

/* 
 * Core app logic
 */
function registerSocketHooks(io) {
    // define handler functions for each event
    io.on('connection', ((socket) => {
        var netid = auth.getNetid(socket.request)
        console.log("A user connected with netid " + netid)

        // terminate if not logged in
        if (!netid) {
            socket.emit("system", SYSTEM_MESSAGES.NO_LOGIN)
            socket.disconnect()
            return
        }

        // terminate if socket connection already exists
        if (connections.has(netid)) {
            socket.emit("system", SYSTEM_MESSAGES.ALREADY_CONNECTED)
            socket.disconnect()
            return
        }
            
        connections.set(netid, { socket: socket, room_id: -1 })

        /* TODO: reconnect to room
    // send new user entire chat history
    for (var msg of messages) {
        socket.emit('message', msg)
    }
    */

        socket.on('disconnect', () => {
            var netid = auth.getNetid(socket.request)
            
            // remove user if they are queued to match
            in_search = in_search.filter(user => user !== netid);

            console.log(connections.get(netid))
            // if user is in room, broadcast that they have disconnected
            var room_id = connections.get(netid).room_id
            if (room_id !== -1) {
                console.log(`Broadcasting to room ${room_id} that ${netid} has disconnected`)
                io.to(room_id).emit('system', SYSTEM_MESSAGES.OTHER_DISCONNECTED)
            }

            connections.delete(netid)
            console.log(`User ${netid} has disconnected`);
        });

        socket.on('find-match', (msg) => {
            var netid = auth.getNetid(socket.request)
            console.log(`Init match from ${netid}`);
            in_search.push(netid)
            checkForMatch(io)
        });

        socket.on('message', (msg) => {
            var netid = auth.getNetid(socket.request)

            // TODO: check if valid
            // get which room that user was in
            var room_id = connections.get(netid).room_id

            console.log(`Received message from ${netid} in room ${room_id}`);

            // TODO: generate ID
            msg.id = Math.random().toString(36).substr(2, 10)

            // save message in memory
            messages.get(room_id).push(msg)

            // emits to all connected sockets in that room
            io.to(room_id).emit('message', msg);
        });
    }).bind(io));
}

module.exports = { registerSocketHooks };