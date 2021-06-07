const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: String,
    text: String,
    filmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Film"
    }
});

module.exports = mongoose.model("comment", commentSchema);
