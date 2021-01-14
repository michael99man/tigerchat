const app = require('express')();
const server = require("http").createServer(app)
const io = require('socket.io')(server, {
        cors: {
            origin: "http://127.0.0.1:3000",
            methods: ["GET", "POST"],
            credentials:true
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

        if (origin.includes("http://127.0.0.1:")) {
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

// send index page on request
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// TEST-ONLY: login page to set session cookie, simulating CAS auth
app.get('/login', (req, res) => {
    function redirectToApp() {
        res.writeHead(302, {
            'Location': 'http://127.0.0.1:3000/app'
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
                'Location': 'http://127.0.0.1:3000/CAS'
            });
            res.end();
            return
        }
    }
});


const messages = []

// map of each connected netid to the associated socket
const connections = new Map()

// queue of people waiting to be connected
var in_search = []

function checkForMatch() {
    if (in_search.length >= 2) {
        // pop the first two and hook them up
    }
}

// define handler functions for each event
io.on('connection', (socket) => {
    console.log("A user connected with netid " + socket.request.session.netid)
    connections.set(socket.request.session.netid, socket)

    // send new user entire chat history
    for (var msg of messages) {
        socket.emit('message', msg)
    }

    socket.on('disconnect', () => {
        netid = socket.request.session.netid;
        connections.delete(netid)

        // remove if they are queued
        in_search = in_search.filter(user => user !== netid);

        console.log(`User ${netid} has disconnected`);
    });

    socket.on('find-match', (msg) => {
        netid = socket.request.session.netid;
        console.log(`Init match from ${netid}`);
        in_search.push(netid)
    });

    socket.on('message', (msg) => {
        netid = socket.request.session.netid;
        messages.push(msg)
        console.log(`Received message from ${netid}`);
        // emits to ALL connected sockets
        io.emit('chat message', msg);
    });
});


// initialize server
server.listen(1738, function (err) {
    if (err) throw err
    console.log('listening on port 1738')
})