/*!

=========================================================
* auth.js
=========================================================

* Abstracts authentication logic 
* Uses express-session to establish user sessions

=========================================================
*/

// TODO: set store (Redis), default stores in memory
const sessionStore = new (require("express-session").MemoryStore)();
const session = require("express-session")({
    secret: "TODO_CHANGE_ME",
    resave: false,
    saveUnitialized: false,
    store: sessionStore,
})
const REACT_SERVER = process.env.REACT_SERVER

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

// register session middleware for express and socket
function registerMiddleware(app, io) {
    app.use(session);
    io.use((socket, next) => {
        session(socket.request, {}, next);
    });
}

async function handleLogin(req, res) {
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
}

// returns netid or null if not logged in
function getNetid(req) {
    if (req.session.netid) {
        return req.session.netid;
    }
    else {
        return null
    }
}


// exported functions
module.exports = { registerMiddleware, handleLogin, hasSessionSet, getNetid }