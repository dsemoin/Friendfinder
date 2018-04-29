// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
module.exports = function apiRoutes(app) {
    const fs = require("fs");
    const path = require("path");
    // this gets data from friends.js
    var friends = require("./../data/friends.js");
    // create route to friends api (friends.json)
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // write compatibility logic
    app.post("/api/friends", function (req, res) {
        // this displays the new user's scores
        var possibleFriends = req.body;
        var scores = [];
        var totalDiff;
        
        // existing scores
        for ( var i = 0; i < friends.length; i++){
            totalDiff = 0;
            // new scores from form.
            for (var j = 0; j < possibleFriends.scores.length; j++){
            // this calculates and returns the absolute value of difference of the two scores to see if there is a match
            totalDiff += Math.abs(friends[i].scores[j] - possibleFriends.scores[j]);
        } 
        // this displays the difference between the two scores
        scores.push(totalDiff);
        }
        // this returns the lowest score from the array using spread syntax and finds the closest match
        var match = scores.indexOf(Math.min(...scores));
        // this adds new users to be matched
        friends.push(possibleFriends)
        console.log(possibleFriends);

        // this reads the original friends.json file and adds the new friend to the file.
        fs.readFile(path.join(__dirname, "../data/friends.json"), "utf8", function (err, data) {
            if (err) throw err;
            var json = JSON.parse(data);
            json.push(possibleFriends);
            fs.writeFile(path.join(__dirname, "../data/friends.json"), JSON.stringify(json, null, 2), function (err) {
                if (err) throw err;
            });
        });
        // characters.push(possibleFriends);

        res.json(friends[match]);
    });
}