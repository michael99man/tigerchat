const app = require('express')();
const server = require("http").createServer(app)
const io = require('socket.io')(server)

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
    if (Object.keys(req.query).length == 0) {
        console.log("No params provided")
        res.status(400).send("No params provided")
        return
    }

    let netid = req.query.netid
    console.log("Logging in " + netid)
    req.session.netid = netid
    res.status(200).send("Set netid to " + netid)
});

const messages = []

// map of each connected netid to the associated socket
const connections = new Map()

// define handler functions for each event
io.on('connection', (socket) => {
    console.log("A user connected with netid " + socket.request.session.netid)
    connections.set(socket.request.session.netid, socket)

    // send new user entire chat history
    for (var msg of messages) {
        socket.emit('chat message', msg)
    }

    socket.on('disconnect', () => {
      netid = socket.request.session.netid;
      connections.delete(netid)
      console.log(`User ${netid} has disconnected`);
    });

    socket.on('chat message', (msg) => {
        netid = socket.request.session.netid;
        messages.push(msg)
        console.log(`Received message from ${netid}`);
        // emits to ALL connected sockets
        io.emit('chat message', msg);
    });
});

server.listen(1738, function (err) {
    if (err) throw err
    console.log('listening on port 1738')
})