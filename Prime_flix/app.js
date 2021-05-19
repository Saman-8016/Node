const express = require("express");
const app = express()
const bodyParser = require("body-parser")

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const films = [
    {
    name: "The Matrix",
    description: "When a beautiful stranger leads computer hacker neo to a for ...",
    artwork: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg",
    casts: "Keanu Reeves"
    },
    {
    name: "The Matrix Reloaded",
    description: "Freedom Fighters Neo, trinity, and Morpheus continue to lead ...",
    artwork: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Poster_-_The_Matrix_Reloaded.jpg/220px-Poster_-_The_Matrix_Reloaded.jpg",
    casts: "Keanu Reeves"
    },
    {
    name: "The Matrix Revolutions",
    description: "Freedom Fighters Neo, trinity, and Morpheus continue to lead ...",
    artwork: "https://upload.wikimedia.org/wikipedia/en/thumb/3/34/Matrix_revolutions_ver7.jpg/220px-Matrix_revolutions_ver7.jpg",
    casts: "Keanu Reeves"
    },
    {
    name: "The Shining",
    description: "Jack Torrance takes a winter caretaker position at the  ...",
    artwork: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/The_Shining_%281980%29_U.K._release_poster_-_The_tide_of_terror_that_swept_America_IS_HERE.jpg/220px-The_Shining_%281980%29_U.K._release_poster_-_The_tide_of_terror_that_swept_America_IS_HERE.jpg",
    casts: "Jack Nicholson"
    }
]

app.get("/", (req, res) => {
    res.render("landing")
});

app.get("/movies", (req, res) => {
    res.render("movies", {films})
});

app.get("/movies/new", (req, res) => {
    res.render("new_movies")
});

app.post("/movies", (req, res) => {
    console.log(req.body);
    films.push(req.body);
    res.redirect("/movies")
})

app.get("/login", (req, res) => {
    res.render("/login")
})

app.get("*", (req, res) => {
    res.render("error")
})

let port = 2000;
app.listen(port, () => {
    console.log("Primeflix is running on localhost:" + port)
});