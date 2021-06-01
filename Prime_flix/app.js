// NPM Imports 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// Config Import
const config = require("./config");

const Film = require("./models/film");
const Comment = require("./models/comment");

mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true});

// Routes
const mainRoute = require("./routes/main");
const movieRoute = require("./routes/movies");
const commentsRoute = require("./routes/comments");
const loginRoute = require("./routes/login");
const errorRoute = require("./routes/error");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Use Routes
app.use(mainRoute);
app.use(movieRoute);
app.use(commentsRoute);
app.use(loginRoute);
app.use(errorRoute);

let port = 2200;
app.listen(port, () => {
    console.log("Primeflix is running on localhost:" + port)
});