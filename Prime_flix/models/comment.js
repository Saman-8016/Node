const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: String,
    text: String,
    filmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Film"
    }
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;

