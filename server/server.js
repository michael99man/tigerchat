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


const session = require("express-session")({
    secret: "TODO_CHANGE_ME",
    resave: false,
    saveUnitialized: false,
    // TODO: set store (Redis), default stores in memory
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

// TEST-ONLY: login page to set session cookie, simulating CAS auth
app.get('/login', (req, res) => {
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