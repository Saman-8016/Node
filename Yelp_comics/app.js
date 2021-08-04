// =======================
// IMPORTS
// =======================
// NPM Imports

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const methodOverride = require("method-override")
const morgan = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const expressSession = require("express-session");

// Config Import
try {
    var config = require("./config");
} catch(e) {
    console.log("could not import config. this probabaly means you are not working locally");
    console.log(e);
}



// Route Imports
const comicRoutes = require('./routes/comics');
const commentRoutes = require('./routes/comments');
const mainRoutes = require('./routes/main');
const authRoutes = require("./routes/auth");


// Model imports
const Comic = require("./models/comic");
const Comment = require("./models/comment");
const User = require("./models/user");


// =======================
// DEVELOPMENTS
// =======================
// Morgan
app.use(morgan('tiny'));


// Seed the DB
// const seed = require("./utils/seed.js");
// seed();
// =======================
// CONFIG
// =======================
// Connect to DB
try {
    mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

} catch(err) {
    console.log("could not use config. this is probabaly mean that you are not running this locally");
    mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
}

// Body Parser Config
app.use(express.urlencoded({extended: true}));
// Express Config
app.set("view engine", "ejs");
app.use(express.static("public"));

// Express Session Config
app.use(expressSession({
    secret: process.env.ES_SECRET || config.expressSession.secret,
    resave: false,
    saveUninitialized: false

}))


// Method Override Config
app.use(methodOverride('_method'));

// Passport Config
app.use(passport.initialize());
app.use(passport.session()); // allow persistent session
passport.serializeUser(User.serializeUser()); // what data should be stored in session
passport.deserializeUser(User.deserializeUser()); // get the user data from the stored session
passport.use(new LocalStrategy(User.authenticate())); // use the local strategy

// Current User Middleware Config
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

// Route Config
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/comics", comicRoutes);
app.use("/comics/:id/comments", commentRoutes);

// =======================
// LISTEN
// =======================
let port = 12345;
app.listen(process.env.PORT || port, () => console.log("yelp comic is running on localhost:"+port));