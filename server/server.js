const app = require('express')();
const server = require("http").createServer(app)
const REACT_SERVER = process.env.REACT_SERVER

const io = require('socket.io')(server, {
    cors: {
        origin: REACT_SERVER,
        methods: ["GET", "POST"],
        credentials: true
    }
}
)
const { rejects } = require('assert');
const cors = require('cors');

var corsOptions = {
    origin: function (origin, callback) {
        //TESTING CORS OVERRIDES ONLY. REMOVE IN PROD
        if (origin == null) {
            callback(null, true);
            return;
        }

        if (origin.includes("http://localhost:") || origin.includes(REACT_SERVER)) {
            //console.log("override for testing");
            callback(null, true);
            return;
        }
    },
    credentials: true
}

// register CORS middleware
app.use(cors(corsOptions));


// TODO: set store (Redis), default stores in memory
const sessionStore = new (require("express-session").MemoryStore)();
const session = require("express-session")({
    secret: "TODO_CHANGE_ME",
    resave: false,
    saveUnitialized: false,
    store: sessionStore,
})

// register session middleware
app.use(session);
io.use((socket, next) => {
    session(socket.request, {}, next);
});

if (REACT_SERVER === undefined) {
    console.error("Error: REACT_SERVER not set")
    process.exit()
}

app.get('/', (req, res) => {
	res.status(404);
	res.send("This page does not exist.");
})


// returns true if netid already has an associated session
async function hasSessionSet(netid) {
    return new Promise((resolve, reject) => {
        sessionStore.all(function (err, sessions) {
            if (err) {
                console.error(err)
                reject(err);
            }
    
            // iterate over session id -> sess mapping
            for (const [_sid, sess] of Object.entries(sessions)) {
                if (sess.netid == netid) {
                    resolve(true)
                }
            } 
            resolve(false)
        });
    }); 
}

// TEST-ONLY: login page to set session cookie, simulating CAS auth
app.get('/login', async (req, res) => {
    function redirectToApp() {
        res.writeHead(302, {
            'Location': `${REACT_SERVER}/app`
        });
        res.end();
    }

    // if logged in, direct to app
    if (req.session.netid) {
        console.log("Already logged in, redirecting")
        redirectToApp()
        return
    } else {
        // if includes CAS provided params, process login
        if (req.query.netid) {
            netid = req.query.netid

            // check if someone is already logged in with that name
            var isSet = await hasSessionSet(netid);
            if (isSet) {
                console.log(`${netid} is already logged in`)
                res.status(401).send(`${netid} is already logged in`)
                return
            }

            // log in the user
            console.log("Logging in " + netid)
            req.session.netid = netid
            redirectToApp()
            return
        } else {
            // redirect to CAS login page
            res.writeHead(302, {
                'Location': `${REACT_SERVER}/CAS`,
            });
            res.end();
            return
        }
    }
});


var ROOM_ID_COUNTER = 0

// map of room_id -> message list
const messages = new Map()

// mapping of each connected netid to the associated socket and room
const connections = new Map()

// mapping of room_id -> pair of users
const rooms = new Map()

// queue of people waiting to be connected
var in_search = []

function checkForMatch() {
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

// define handler functions for each event
io.on('connection', (socket) => {
    console.log("A user connected with netid " + socket.request.session.netid)

    // terminate if not logged in
    if (!socket.request.session.netid) {
        socket.disconnect()
        return
    }

    connections.set(socket.request.session.netid, { socket: socket, room_id: -1 })

    /* TODO: reconnect to room
// send new user entire chat history
for (var msg of messages) {
    socket.emit('message', msg)
}
*/

    socket.on('disconnect', () => {
        netid = socket.request.session.netid;
        connections.delete(netid)

        // remove user they are queued
        in_search = in_search.filter(user => user !== netid);

        console.log(`User ${netid} has disconnected`);
    });

    socket.on('find-match', (msg) => {
        netid = socket.request.session.netid;
        console.log(`Init match from ${netid}`);
        in_search.push(netid)
        checkForMatch()
    });

    socket.on('message', (msg) => {
        netid = socket.request.session.netid;

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
});


// initialize server
server.listen(1738, function (err) {
    if (err) throw err
    console.log('listening on port 1738')
})