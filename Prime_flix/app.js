const express = require("express");
const app = express()
const bodyParser = require("body-parser")

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("landing")
});

app.get("/movies", (req, res) => {
    res.render("movies")
})

let port = 2000;
app.listen(port, () => {
    console.log("Primeflix is running on localhost:" + port)
});