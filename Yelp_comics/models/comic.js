const mongoose = require("mongoose");

const comicSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String
});

const Comic = mongoose.model("comic", comicSchema);

module.exports = Comic;


