const express = require("express");
const router = express.Router();
const Film = require("../models/film");
const Comment = require("../models/comment");


router.get("/movies", async (req, res) => {
    try {
        const films = await Film.find().exec()
        res.render("movies", {films})
    } catch (err) {
        console.log(err);
        res.send("You Broke it ... /movies");
    }
    
});

router.get("/movies/new", (req, res) => {
    res.render("new_movies")
});

//Show
router.get("/movies/:id", async (req, res) => {

    try {
        const film = await Film.findById(req.params.id).exec();
        const comments = await Comment.find({filmId: req.params.id});
        res.render("show_page", {film, comments})
    } catch (err) {
        console.log(err);
        res.send("Broken ... movies/:id show")
    }
})
//Create
router.post("/movies", async (req, res) => {
    const genre = req.body.genre.toLowerCase();
    const newFilm = {
        name: req.body.name,
        description: req.body.description,
        casts: req.body.casts,
        origin: req.body.origin,
        genre: genre,
        date: req.body.date,
        artwork: req.body.artwork
    }

    try {
        const film = await Film.create(newFilm);
        console.log(film);
        res.redirect("/movies")
    } catch (err) {
        console.log(err);
        res.send("You Broke it ... movies POST")
    }
});

//Edit
router.get("/movies/:id/edit", async (req, res) => {
    try {
        const film = await Film.findById(req.params.id).exec();
        res.render("movie_edit", {film})

    } catch (err) {
        console.log(err);
        res.send("You Broke it ... / Edit")
    }
})

//Update
router.put("/movies/:id", async (req, res) => {
    const genre = req.body.genre.toLowerCase();
    const filmBody = {
        name: req.body.name,
        description: req.body.description,
        casts: req.body.casts,
        origin: req.body.origin,
        genre: genre,
        date: req.body.date,
        artwork: req.body.artwork
    }
    try {
        const film = await Film.findByIdAndUpdate(req.params.id, filmBody, {new: true}).exec();
        res.redirect("/movies/"+req.params.id);
    } catch (err) {
        console.log(err);
        res.send("You Broke it again ... /movies/:id PUT")
    }
})

router.delete("/movies/:id", async (req, res) => {

    try {
        const film = await Film.findByIdAndDelete(req.params.id).exec();
        res.redirect("/movies")
    } catch (err) {
        console.log(err);
        res.send("Your broke it .. / movies/:id DELETE")
    }
})

module.exports = router;