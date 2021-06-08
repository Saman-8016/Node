const express = require("express");
const router = express.Router();
const Comic = require('../models/comic');
const Comment = require("../models/comment");

router.get("/", (req, res) => {
	Comic.find()
	.exec()
	.then((foundComics) => {
		res.render("comics", {comics: foundComics})
	})
	.catch((err) => {
		console.log(err)
		res.send("err")
	})
})

router.post("/", (req, res) => {
	const genre = req.body.genre.toLowerCase();
	const newComic = {
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		publisher: req.body.author,
		date: req.body.date,
		series: req.body.series,
		issue: req.body.issue,
		genre,
		color: !!req.body.color,
		image: req.body.image
	}

	Comic.create(newComic)
	.then((comic) => {
		console.log(comic)
		res.redirect("/comics")
	})
	.catch((err) => {
		console.log(err)
		res.redirect("/comics")
	})
});

router.get("/new", (req, res) => {
	res.render("comics_new");
})

router.get("/:id", (req, res) => {
	Comic.findById(req.params.id)
	.exec()
	.then((comic) => {
		Comment.find({comicId: req.params.id}, (err, comments) => {
			if (err) {
				res.send(err)
			} else {
				res.render("comics_show", {comic, comments})
			}
		})
	})
	.catch((err) => {
		res.send(err)
	})
})

module.exports = router;