const express = require("express");
const router = express.Router();
const Film = require("../models/film");


router.get("/movies", (req, res) => {
    Film.find()
    .exec()
    .then((foundfilms) => {
        res.render("movies", {films: foundfilms})
    })
});

router.get("/movies/new", (req, res) => {
    res.render("new_movies")
});

router.get("/movies/:id", (req, res) => {
    Film.findById(req.params.id)
    .exec()
    .then((film) => {
        res.render("show_page", {film})
    })
});

router.post("/movies", (req, res) => {
    const newFilm = {
        name: req.body.name,
        description: req.body.description,
        casts: req.body.casts,
        origin: req.body.origin, 
        genre: req.body.genre,
        year: req.body.year,
        artwork: req.body.artwork
    }

    Film.create(newFilm)
    .then((film) => {
		console.log(film)
		res.redirect("/movies")
	})
	.catch((err) => {
		console.log(err)
		res.redirect("/movies")
	})
});

module.exports = router;