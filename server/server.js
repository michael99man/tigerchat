/*!

=========================================================
* server.js
=========================================================

* Defines core server routes and middleware

=========================================================
*/

const app = require('express')();
const server = require("http").createServer(app)
require('dotenv').config();
const REACT_SERVER = process.env.NODE_ENV === "production" ? process.env.PROD_SERVER : process.env.DEV_SERVER
const auth = require("./auth")
const { registerSocketHooks } = require("./app")

if (REACT_SERVER === undefined) {
    console.error("Error: REACT_SERVER not set")
    process.exit()
}

// create socket server
const io = require('socket.io')(server, {
    cors: {
        origin: REACT_SERVER,
        methods: ["GET", "POST"],
        credentials: true
    }
});

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

// register middleware for cors and authentication
app.use(cors(corsOptions));
auth.registerMiddleware(app, io)

// initialize app logic
registerSocketHooks(io)

/* 
 * Define accepted API routes
 */

app.get('/', (req, res) => {
    res.status(404);
    res.send("This page does not exist.");
})

// TEST-ONLY: login page to set session cookie, simulating CAS auth
app.get('/login', auth.handleLogin);


// initialize server
server.listen(1738, function (err) {
    if (err) throw err
    console.log('listening on port 1738')
})
