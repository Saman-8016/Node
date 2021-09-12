// ===========================
// IMPORTS
// ===========================

// NPM Imports
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Route Imports
const mainRoutes = require("./routes/main");

// ===========================
// CONFIGS
// ===========================

// Express Config
app.set("view engine", "ejs"); 

// Route Config
app.use(mainRoutes);





















// ===========================
// LISTEN
// ===========================

let port = 2222;
app.listen(port, () => {
    console.log("Food_Lix is running on localhost:" + port);
})