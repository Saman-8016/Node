const Comic = require("../models/comic");

const checkComicOwner = async (req, res, next) => {
    if (req.isAuthenticated()) { // check if the user is logged in
        // if loged in, check if they own the comic
        const comic = await Comic.findById(req.params.id).exec();
        console.log(comic.owner.id);
        console.log(req.user._id);
        if (comic.owner.id.equals(req.user._id)) {
            // if owner, render the form to edit
            next();
        } else { // if not, redirect back to show page
            res.redirect("back");
        }
    } else { // if not logged in, redirect to /login
        res.redirect("/login");
    }
}

module.exports = checkComicOwner;
