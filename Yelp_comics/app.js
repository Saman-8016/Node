// =======================
// IMPORTS
// =======================
// NPM Imports
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const methodOverride = require("method-override")
var morgan = require("morgan");

// Config Import
const config = require("./config");


// Route Imports
const comicRoutes = require('./routes/comics');
const commentRoutes = require('./routes/comments');
const mainRoutes = require('./routes/main');

// Model imports
const Comic = require("./models/comic");
const Comment = require("./models/comment");


// =======================
// DEVELOPMENTS
// =======================
// Morgan
app.use(morgan('tiny'));


// Seed the DB
const seed = require("./utils/seed.js");
seed();
// =======================
// CONFIG
// =======================
// Connect to DB
mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true});

// Express Config
app.set("view engine", "ejs");
app.use(express.static("public"));

// Body Parser Config
app.use(express.urlencoded({extended: true}));

// Method Override Config
app.use(methodOverride('_method'));



// Route Config
app.use("/", mainRoutes);
app.use("/comics", comicRoutes);
app.use("/comics/:id/comments", commentRoutes);

// =======================
// LISTEN
// =======================
let port = 12345;
app.listen(port, () => console.log("yelp comic is running on localhost:"+port));