const express = require("express");
const router = express.Router({mergeParams: true});
const Comment = require("../models/comment");
const Comic = require("../models/comic");
const isLoggedIn = require("../utils/isLoggedIn");
const checkCommentOwner = require("../utils/checkCommentOwner");

router.get("/new", isLoggedIn, (req, res) => {
	res.render("comments_new", {comicId: req.params.id})
})


router.post("/", isLoggedIn, async (req, res) => {
	// create the comment
	try {
		const comment = await Comment.create({
			user: {
				id: req.user._id,
				username: req.user.username
			},
			text: req.body.text,
			comicId: req.body.comicId
		})
		console.log(comment);
		res.redirect('/comics/'+ req.body.comicId);

	} catch (err) {
		console.log(err);
		res.send("Broken again ... POST comment")
	}
})

// Edit Comment - show the comment form
router.get("/:commentId/edit", checkCommentOwner, async (req, res) => {
	
	try {
		const comic = await Comic.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec();
		console.log("Comic: ", comic);
		console.log("Comment: ", comment);
		res.render("comments_edit", {comic, comment}); 
	} catch (err) {
		console.log(err);
		res.send("broke ... comment/edit");
	}

})
// update - actually update in the DB
router.put("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true});
		console.log(comment);
		res.redirect("/comics/"+req.params.id)
	} catch (err) {
		console.log(err);
		res.send("broken again .../comment put UPDATE")
	}

})
// Delete - delete the comment
router.delete("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		console.log(comment);
		res.redirect("/comics/"+req.params.id);
	} catch (err) {
		console.log(err);
		res.send("Broken again .../comment DELETE")
	}
})


module.exports = router;