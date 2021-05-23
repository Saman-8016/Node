const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    name: String,
    description: String,
    casts: String,
    artwork: String
});

const Film = mongoose.model("film", filmSchema);

module.exports = Film;
