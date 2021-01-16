/*!

=========================================================
* students.js
=========================================================

* Loads encrypted student data from disk
* Provides a method to fetch data by netid

=========================================================
*/

var fs = require('fs');
var crypto = require('crypto');

// load env variables
require('dotenv').config();
const KEY = process.env.STUDENTS_KEY

var cipher = crypto.createDecipher('aes-256-cbc', KEY);
var input = fs.createReadStream('students.json.enc');

input.pipe(cipher)

var decrypted = "";
var students = new Map();
cipher.on('readable', function() {
  var data = cipher.read();
  if (data)
    decrypted += data.toString();
});

cipher.on('end', function () {
        var arr = JSON.parse(decrypted)

    for (entry of arr) {
        students.set(entry['net_id'], entry)
    }
    console.log(`Loaded ${students.size} students from file`)
});

function getStudent(netid) {
    if (students.has(netid)) {
        return students.get(netid);
    } else {
        return {}
    }
}

module.exports = {getStudent}