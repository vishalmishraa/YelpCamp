//all the middle ware goes here
var middlewareObj = {},
    Campground = require('../models/campground'),
    Comment = require('../models/comment');

middlewareObj.checkCampgroundOwnership = (req, res, next) => {

    //IS USER LOGED IN
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                res.redirect('back');
            } else {
                //does user owned campground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
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
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = middlewareObj;