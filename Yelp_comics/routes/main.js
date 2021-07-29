const express = require('express');
const router = express();
const isLoggedIn = require("../utils/isLoggedIn");

router.get("/", (req, res) => {
	res.render("landing");
})

router.get("/account", isLoggedIn, (req, res) => {
	res.render("account")
})

module.exports = router;