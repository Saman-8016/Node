const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const config = require("./config");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local");
const expressSession = require("express-session");
const user = require("./models/user");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// Express Session Config
app.use(expressSession({
    secret: "afiscisdnkcmsdlmoiwejfmsdcpokdpgojgmdgoDFp[kwpodJFOIfoiejfkc",
    resave: false,
    saveUninitialized: false
}))

// Passport Config
app.use(passport.initialize());
app.use(passport.session()); // allows persistent session
passport.serializeUser(user.serializeUser()); // enodes the data into the session(passport-local-mongoose)
passport.deserializeUser(user.deserializeUser()); //decodes data form the seesion (passport-local-mongoose)
const localStrategy = passportLocal.Strategy;
passport.use(new localStrategy(user.authenticate()))

// =================
// ROUTES
// =================

// INDEX Route
app.get("/", (req, res) => {

    res.render("index")
})

// ACCOUNT ROUTE
app.get("/account", isLoggedIn, (req, res) => {

    res.render("account")
})

// Signup New
app.get("/signup", (req, res) => {
    res.render("signup");
})

// Signup Create
app.post("/signup", async (req, res) => {
    try {
        const newUser = await user.register(new user(
            {
                username: req.body.username,
                email: req.body.email

            }
        )
            , req.body.password);
        console.log(newUser);
        passport.authenticate('local')(req, res, () => {
            res.redirect("/account")
        })
    } catch(err) {
        console.log(err);
        res.send("error in signing up ...")
    }
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/account",
    failureRedirect: "/login"
}))

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
})

// Authorization Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        // if yes continue
        return next();
    } else {
        // if not, redirect to login page
        res.redirect("/login")
    }
}

port = 3000;
app.listen(port, () => {
    console.log ("listening on localhost:"+port)
})
