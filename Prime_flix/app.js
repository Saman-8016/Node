// ========================
// IMPORTS
// ========================

// NPM Imports 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const methodOverride = require('method-override');
var morgan = require("morgan");

// Config Import
const config = require("./config");

// Route Import
const mainRoute = require("./routes/main");
const movieRoute = require("./routes/movies");
const loginRoute = require("./routes/login");
const commentRoute = require("./routes/comments");
const signupRoute = require("./routes/signup");
const errorRoute = require("./routes/error");

//Model Imports
const Film = require("./models/film");
const Comment = require("./models/comment");

// ========================
// DEVELOPMENT
// ========================

// Morgan
app.use(morgan('tiny'));

// Seed the DB
const seed = require("./utils/seed");
seed()

// ========================
// CONFIG
// ========================

// Connect to DB
mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// Express Config
app.set("view engine", "ejs");
app.use(express.static("public"));

// Body Parser Config
app.use(bodyParser.urlencoded({extended: true}));

// Method Override Config
app.use(methodOverride("_method"));


// Routes Config
app.use(mainRoute);
app.use(movieRoute);
app.use(commentRoute);
app.use(loginRoute);
app.use(signupRoute);
app.use(errorRoute);

// ========================
// LISTEN
// ========================

let port = 2200;
app.listen(port, () => {
    console.log("Primeflix is running on localhost:" + port)
});