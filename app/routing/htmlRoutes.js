// A GET Route to /survey which should display the survey page.
// A default, catch-all route that leads to home.html which displays the home page.

// this connects the routes to the server (like a bridge) These routes are only sending the files.
module.exports = function htmlRoutes(app) {
    const path = require("path");
// this displays the home page
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
// this displays the survey page
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });
}