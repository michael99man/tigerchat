const APP_MODES = {
  LANDING: 0,
  SEARCHING: 1,
  IN_ROOM: 2,
  ALREADY_CONNECTED: 3,
}

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

// text labels for each mode when selected (long, short)
const MATCH_MODE_TEXT = {}
MATCH_MODE_TEXT[MATCH_MODE.ANYONE] = ["Anyone", "Anyone"]
MATCH_MODE_TEXT[MATCH_MODE.CLASS] = ["Someone in your class year", "Class year"]
MATCH_MODE_TEXT[MATCH_MODE.MAJOR] = ["Someone in your major", "Major"]
MATCH_MODE_TEXT[MATCH_MODE.RES_COLLEGE] = ["Someone in your residential college", "Res College"]


module.exports = { APP_MODES, SYSTEM_MESSAGES, MATCH_MODE, MATCH_MODE_TEXT }