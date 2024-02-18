let express = require("express");
let app = express();
require("dotenv").config()

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use("/public", express.static(__dirname + "/public"));

absolutePath = __dirname + "/views/index.html";

app.get("/", (req, res) => {
    res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
    let response = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        response = response.toUpperCase();
    }
    res.json({ message: response });
});

// middleware chaining 
app.get(
    "/now",
    (req, res, next) => {
        req.time = new Date().toString();
        next();
    },
    (req, res) => {
        res.json({ time: req.time });
    },
);

// route paramater
app.get("/:word/echo", (req, res) => {
    res.json({ echo: req.params.word })
});

// query string
app.get("/name", (req, res) => {
    res.json({ name: `${req.query.first} ${req.query.last}` })
})
// note from last question. can chain different verb handles on the same path route for cleaner code: app.route(path).get(handler).post(handler)

module.exports = app;
