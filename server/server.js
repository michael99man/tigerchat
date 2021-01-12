const app = require('express')();
const server = require("http").createServer(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


var messages = []
  
// define handler functions for each event
io.on('connection', (socket) => {
    console.log('a user connected');
    // send new user entire chat history
    for (var msg of messages) {
        socket.emit('chat message', msg)
    }

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        messages.push(msg)

        // emits to ALL connected sockets
        io.emit('chat message', msg);
    });
});

server.listen(1738, function (err) {
    if (err) throw err
    console.log('listening on port 1738')
})