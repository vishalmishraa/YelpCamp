const express = require('express'),
    router = express.Router();
Campground = require('../models/campground')

//INDEX - SHOW OUR CAMPGROUND
router.get('/', (req, res) => {
    console.log(req.user);
    //get vampground from db
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', { campgrounds: allCampgrounds, currentUser: req.user });
        }
    });

});


//CREATE NEW CAMP GRPOUND TO DATABSED
router.post('/', (req, res) => {
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var desc = req.body.description;
    var newCampground = { name: name, image: image, description: desc, author: author };

    //create a new campground and save to data base
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err)
        } else {
            //redirct back to campgroud page 
            console.log(newlyCreated)
            res.redirect('/campgrounds')
        }
    })

});


//SHOW FORM TO CREATE NEW CAMPGROUNDS
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});


//SHOW MORE INFO ABOUNT ONE CAMGROUNDS
router.get("/:id", (req, res) => {
    //FIND THE CAMPGRPIUND WITH PROVIDED ID
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampgrounds);
            //RENDER SHOW TEMPLATE WITH THAT CAMPGROUNDS\
            res.render("campgrounds/show", { campgrounds: foundCampgrounds });
        }
    })

});

//midleware 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;