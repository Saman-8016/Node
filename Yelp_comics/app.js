// NPM Imports
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require('mongoose');

// Config Import
const config = require("./config");

// Route Imports
const comicRoutes = require('./routes/comics');
const commentRoutes = require('./routes/comments');
const mainRoutes = require('./routes/main');

// Model imports
const Comic = require("./models/comic");
const Comment = require("./models/comment");

mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

// Use Routes
app.use(mainRoutes);
app.use(comicRoutes);
app.use(commentRoutes);

let port = 12345;
app.listen(port, () => console.log("yelp comic is running on localhost:"+port));