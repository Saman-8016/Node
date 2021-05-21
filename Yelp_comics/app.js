const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const config = require("./config");
const Comic = require("./models/comic");

const mongoose = require('mongoose');
mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true});


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
	res.render("landing");
})

app.get("/comics", (req, res) => {
	Comic.find()
	.exec()
	.then((foundComics) => {
		res.render("comics", {comics: foundComics})
	})
	.catch((err) => {
		console.log(err)
		res.send("err")
	})
	
})

app.post("/comics", (req, res) => {
	
	const newComic = {
		title: req.body.title,
		description: req.body.description,
		image: req.body.image
	}

	Comic.create(newComic)
	.then((comic) => {
		console.log(comic)
		res.redirect("/comics")
	})
	.catch((err) => {
		console.log(err)
		res.redirect("/comics")
	})
});

app.get("/comics/new", (req, res) => {
	res.render("comics_new");
})
let port = 12345;
app.listen(port, () => {
	console.log("yelp comic is running on localhost:"+port);
});