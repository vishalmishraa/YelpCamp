//all the middle ware goes here
var middlewareObj = {},
    Campground = require('../models/campground'),
    Comment = require('../models/comment');

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    //IS USER LOGED IN
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                req.flash('error', "Campground not found :(");
                res.redirect('back');
            } else {
                //does user owned campground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', "You Don't have permission to do that:(");
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', "You need to be logged in to do that!")
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
    //IS USER LOGED IN
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect('back');
            } else {
                //does user owned comment
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', "You Don't have permission to do that :(");
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', "You need to be logged in to do that :(");
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', "You need to be logged in to do that!");
    res.redirect("/login");
}


module.exports = middlewareObj;