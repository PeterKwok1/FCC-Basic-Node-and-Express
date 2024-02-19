let express = require("express");
let app = express();
require("dotenv").config() // load .env variables into process.env
let bodyParse = require("body-parser") // parse body requests

// middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use("/public", express.static(__dirname + "/public"));
absolutePath = __dirname + "/views/index.html";
// route
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

app.use(bodyParse.urlencoded({ extended: false }))
// verb handler chaining
app.route("/name")
    .get((req, res) => {
        res.json({ name: `${req.query.first} ${req.query.last}` }) // query string
    })
    .post((req, res) => {
        res.json({ name: `${req.body.first} ${req.body.last}` })
    })

module.exports = app;
