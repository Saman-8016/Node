const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const comics = [
	{
		title: "Watchmen",
		description: "I'm baby viral mixtape 3 wolf moon craft beer. Poke pour-over ethical, air plant asymmetrical gentrify hell of vegan photo booth truffaut kombucha food truck hoodie artisan. Mixtape portland pug artisan fashion axe before they sold out. Art party hot chicken single-origin coffee vice man braid air plant. Intelligentsia etsy hella taxidermy, pop-up shoreditch disrupt gochujang edison bulb biodiesel cray kickstarter snackwave quinoa. Austin YOLO williamsburg chicharrones. Snackwave small batch pork belly coloring book selfies. Air plant microdosing wayfarers, disrupt tofu pok pok humblebrag austin. Irony raw denim forage tumblr humblebrag.",
		image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Watchmen%2C_issue_1.jpg/220px-Watchmen%2C_issue_1.jpg"
	},
	{
		title: "Batman",
		description: "I'm baby viral mixtape 3 wolf moon craft beer. Poke pour-over ethical, air plant asymmetrical gentrify hell of vegan photo booth truffaut kombucha food truck hoodie artisan. Mixtape portland pug artisan fashion axe before they sold out. Art party hot chicken single-origin coffee vice man braid air plant. Intelligentsia etsy hella taxidermy, pop-up shoreditch disrupt gochujang edison bulb biodiesel cray kickstarter snackwave quinoa. Austin YOLO williamsburg chicharrones. Snackwave small batch pork belly coloring book selfies. Air plant microdosing wayfarers, disrupt tofu pok pok humblebrag austin. Irony raw denim forage tumblr humblebrag.",
		image: "https://upload.wikimedia.org/wikipedia/en/c/c7/Batman_Infobox.jpg"
	},
	{
		title: "Y: The Last Man",
		description: "I'm baby viral mixtape 3 wolf moon craft beer. Poke pour-over ethical, air plant asymmetrical gentrify hell of vegan photo booth truffaut kombucha food truck hoodie artisan. Mixtape portland pug artisan fashion axe before they sold out. Art party hot chicken single-origin coffee vice man braid air plant. Intelligentsia etsy hella taxidermy, pop-up shoreditch disrupt gochujang edison bulb biodiesel cray kickstarter snackwave quinoa. Austin YOLO williamsburg chicharrones. Snackwave small batch pork belly coloring book selfies. Air plant microdosing wayfarers, disrupt tofu pok pok humblebrag austin. Irony raw denim forage tumblr humblebrag.",
		image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Y_-_The_Last_Man_23_-_Widow%27s_Pass_03_-_00_-_FC.jpg/250px-Y_-_The_Last_Man_23_-_Widow%27s_Pass_03_-_00_-_FC.jpg"
	}
]

app.get("/", (req, res) => {
	res.render("landing");
})

app.get("/comics", (req, res) => {
	res.render("comics", {comics});
})

app.post("/comics", (req, res) => {
	console.log(req.body);
	comics.push(req.body);
	res.redirect("/comics")
})

app.get("/comics/new", (req, res) => {
	res.render("comics_new");
})
app.listen(3000, () => {
	console.log("yelp comic is running");
});