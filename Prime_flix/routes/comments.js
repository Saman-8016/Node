const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

router.get("/movies/:id/comments/new", (req, res) => {
    res.render("new_comments", {filmId: req.params.id})
})

router.post("/movies/:id/comments", (req, res) => {
    //create the comment
    Comment.create({
        user:req.body.user,
        text: req.body.text,
        filmId: req.body.filmId
    })
    .then((newComment) => {
        console.log(newComment);
        res.redirect('/movies/'+req.body.filmId)
    })
    .catch((err) => {
        console.log(err)
        res.redirect('/comics/'+req.body.filmId)
    })
})

module.exports = router;