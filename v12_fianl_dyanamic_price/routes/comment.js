//++++++++++++++++++++++++++++++++
//COMMENTS ROUTES
//++++++++++++++++++++++++++++++++
const express = require('express'),
    router = express.Router({ mergeParams: true }),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    middleware = require('../middleware');



//COMMENTS NEW
router.get('/new', middleware.isLoggedIn, (req, res) => {
    //find by id
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', { campground: campground });

        }
    });
});


//CREATE COMMENT
router.post('/', middleware.isLoggedIn, (req, res) => {
    //lookupo camground s by id
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err)
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    req.flash('error', "Something went Wrong. Try again:(");
                    console.log(err)
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash('success', "Successfully added comment");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    //create new coments
    //correcr nrew camments to campgrounds
    //redirect to campground show page
});

//COMENT EDIT ROUTE
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.redirect('back')
        } else {
            res.render('comments/edit', { campground_id: req.params.id, comment: foundComment })
        }
    })
});

///COMMENT UPDATE
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err) {
            res.redirect('back')
        } else {
            req.flash('success', "Comment Updated :)");
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
});

//COMMENT DISTROY ROUTE
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            res.redirect('back');
        } else {
            req.flash('Success', "Comment Deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })

});


module.exports = router;