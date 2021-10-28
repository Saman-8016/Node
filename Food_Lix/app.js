// ===========================
// IMPORTS
// ===========================

// NPM Imports
const express = require("express");
const bodyParser = require("body-parser");
const app = express();


// ===========================
// CONFIGS
// ===========================

// Express Config
app.set("view engine", "ejs"); 
app.use(express.static("public"));

// Body Parser Config
app.use(bodyParser.urlencoded({extended: true}));



// ===========================
// DATA
// ===========================

const foods = [
    {
        name: "Pasta",
        origin: "Italian",
        ingredients: "Pasta, Tomato sauce,Ground Beef, Onion, Turmeric, Salt, Pepper, Oil",
        difficulty: "easy",
        duration: "45 min",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY01DftRkRYjqI7_ZNEfdVM7q28rK0oGaaKw&usqp=CAU"
    },
    {
        name: "Steamed Rice",
        origin: "Persian",
        ingredients: "Rice, Water, Salt, Oil",
        difficulty: "easy",
        duration: "45 min",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0HcdeekZApd0W1qrcgj2vYhlHThqbpDwyOw&usqp=CAU"
    },
    {
        name: "Crispy Fried Chicken",
        origin: "American",
        ingredients: "Chicken, Onion, Salt, Pepper, Oil, Egg, ",
        difficulty: "easy",
        duration: "20 min",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpnMV0qMAB8LYpf5ZcChjGV0fAblTm97sU2g&usqp=CAU"
    }
]


app.get("/", (req, res) => {
    res.render("landing");
})

app.get("/foods", (req, res) => {
    res.render("foods", {foods})
})

app.get("*", (req, res) => {
    res.render("error")
})

app.post("/foods", (req, res) => {
    console.log(req.body);
    foods.push(req.body);
    res.redirect("/foods")
})


// ===========================
// LISTEN
// ===========================

let port = 2222;
app.listen(port, () => {
    console.log("Food_Lix is running on localhost:" + port);
})