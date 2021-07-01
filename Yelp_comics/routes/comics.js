const express = require("express");
const router = express.Router();
const Comic = require('../models/comic');
const Comment = require("../models/comment");

//Index
router.get("/", async (req, res) => {
	try {
		const comics = await Comic.find().exec()
		res.render("comics", {comics})
	} catch (err) {
		console.log(err);
		res.send("You Brok it ... /index");
	}
	
	
})
//Create
router.post("/", async (req, res) => {
	const genre = req.body.genre.toLowerCase();
	const newComic = {
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		publisher: req.body.publisher,
		date: req.body.date,
		series: req.body.series,
		issue: req.body.issue,
		genre,
		color: !!req.body.color,
		image: req.body.image
	}

	try {
		const comic = await Comic.create(newComic)
		console.log(comic)
		res.redirect("/comics/" + comic._id)
	} catch (err) {
		console.log(err);
		res.send("You Broke it ... / comics POST")
	}
});

//New
router.get("/new", (req, res) => {
	res.render("comics_new");
})

//Show
router.get("/:id", async (req, res) => {
	try {
		const comic = await Comic.findById(req.params.id).exec();
		const comments = await Comment.find({comicId: req.params.id})
		res.render("comics_show", {comic, comments})
	} catch (err) {
		console.log(err);
		res.send("Your Broke it ... /comics/:id")
	}
})

//Edit
router.get("/:id/edit", async (req, res) => {
	try {
		const comic = await Comic.findById(req.params.id).exec();
		res.render("comic_edit", {comic});
	} catch (err) {
		console.log(err);
		res.send("Broken... /comics/id/edit");
	}
})

//Update
router.put("/:id", async (req, res) => {
	const genre = req.body.genre.toLowerCase();
	const comicBody = {
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		publisher: req.body.publisher,
		date: req.body.date,
		series: req.body.series,
		issue: req.body.issue,
		genre,
		color: !!req.body.color,
		image: req.body.image
	}

	try {
		const comic = await Comic.findByIdAndUpdate(req.params.id, comicBody, {new:true}).exec();
		res.redirect("/comics/"+req.params.id);
	} catch (err) {
		console.log(err);
		res.send("Broken ... /comic/:id PUT")
	}
	
})

//Delete
router.delete("/:id", async (req, res) => {
	try {
		const comic = await Comic.findByIdAndDelete(req.params.id).exec();
		res.redirect("/comics");
	} catch {
		console.log(err);
		res.send("Brokennn /comics/:id DELETE")
	}
})

module.exports = router;