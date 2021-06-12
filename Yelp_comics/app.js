// NPM Imports
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const methodOverride = require("method-override")

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

// config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Use Routes
app.use("/", mainRoutes);
app.use("/comics", comicRoutes);
app.use("/comics/:id/comments", commentRoutes);

let port = 12345;
app.listen(port, () => console.log("yelp comic is running on localhost:"+port));