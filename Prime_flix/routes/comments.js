const express = require("express");
const router = express.Router();
const Comment = require("../models/comment")

router.get("/movies/:id/comments/new", (req, res) => {
    res.render("comment_new", {filmId: req.params.id})
})

router.post("/movies/:id/comments", (req, res) => {
    // res.send("hit the create comment route")
    // create the comment
    Comment.create({
        user: req.body.user,
        text: req.body.text,
        filmId: req.body.filmId
    })
    .then((newComment) => {
        console.log(newComment);
        res.redirect("/movies/"+ req.body.filmId)
    })
    .catch((err) => {
        console.log(err);
        res.redirect("/movies/"+ req.body.filmId)
    })

    // redirect to the show_page to that movie 
})

module.exports = router;