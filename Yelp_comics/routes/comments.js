const express = require("express");
const router = express.Router();
const Comment = require("../models/comment")

router.get("/comics/:id/comments/new", (req, res) => {
	res.render("comments_new", {comicId: req.params.id})
})


router.post("/comics/:id/comments", (req, res) => {
	// create the comment
	Comment.create({
		user: req.body.user,
		text: req.body.text,
		comicId: req.body.comicId
	})
	.then((newComment) => {
		console.log(newComment);
		res.redirect('/comics/'+ req.body.comicId)
	})
	.catch((err) => {
		console.log(err)
		res.redirect('/comics/'+ req.body.comicId)
	})
	//redirect to the show page
})
// Creat Comment - Actually Update DB

module.exports = router;