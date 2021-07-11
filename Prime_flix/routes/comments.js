const express = require("express");
const router = express.Router();
const Comment = require("../models/comment")
const Film = require("../models/film")

router.get("/movies/:id/comments/new", (req, res) => {
    res.render("comment_new", {filmId: req.params.id})
})

router.post("/movies/:id/comments", async (req, res) => {
    try {
        const comment = await Comment.create({
            user: req.body.user,
            text: req.body.text,
            filmId: req.body.filmId
        })
        console.log(comment);
        res.redirect("/movies/"+ req.body.filmId)
    } catch (err) {
        console.log(err);
        res.send("Broken ... comment POST create")
    }
})

//EDIT - show the edit page ...
// show the edit page and then create a post route to update

router.get("/movies/:id/comments/:commentid/edit", async (req, res) => {
    try {
        const film = await Film.findById(req.params.id).exec();
        const comment = await Comment.findById(req.params.commentid).exec();
        console.log("film: ", film);
        console.log("comment ", comment);
        res.render("comment_edit", {film, comment}); 
    } catch (err) {
        console.log(err);
        res.send("Broke it again ... comment edit get")
    }
})

router.put("/movies/:id/comments/:commentid", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.commentid, {text: req.body.text}, {new: true});
        console.log(comment);
        res.redirect("/movies/"+req.params.id);
    } catch (err) {
        console.log(err);
        res.send('broken ... comment update PUT')
    }
})

router.delete("/movies/:id/comments/:commentid", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentid);
        console.log(comment);
        res.redirect("/movies/"+req.params.id);
    } catch (err) {
        console.log(err);
    }   res.send('broken ... comment DELETE')
})

module.exports = router;