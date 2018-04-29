// This connects to the friends.json file 
const fs = require("fs");
const path = require("path");
// this reads and parses the data 
var raw = fs.readFileSync(path.join(__dirname, "friends.json"));
var friends = JSON.parse(raw);
// this exports the json objects to the app
module.exports = friends;