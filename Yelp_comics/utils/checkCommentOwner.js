const Comment = require("../models/comment");


const checkCommentOwner = async (req, res, next) => {
    if (req.isAuthenticated()) { // check if the user is logged in
        // if loged in, check if they own the comic
        const comment = await Comment.findById(req.params.commentId).exec();
        console.log(comment.user.id);
        console.log(req.user._id);
        if (comment.user.id.equals(req.user._id)) {
            // if owner, render the form to edit
            next();
        } else { // if not, redirect back to show page
            res.redirect("back");
        }
    } else { // if not logged in, redirect to /login
        res.redirect("/login");
    }
}

module.exports = checkCommentOwner;
