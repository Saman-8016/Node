// NPM Imports 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Config Import
const config = require("./config");

// Routes
const mainRoute = require("./routes/main");
const movieRoute = require("./routes/movies");
const loginRoute = require("./routes/login");
const commentRoute = require("./routes/comments");
const errorRoute = require("./routes/error");

//Model Imports
const Film = require("./models/film");
const Comment = require("./models/comment");

mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));


// Use Routes
app.use(mainRoute);
app.use(movieRoute);
app.use(commentRoute);
app.use(loginRoute);
app.use(errorRoute);



let port = 2200;
app.listen(port, () => {
    console.log("Primeflix is running on localhost:" + port)
});