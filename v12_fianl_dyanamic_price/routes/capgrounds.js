const express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground'),
    middleware = require('../middleware');

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
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var desc = req.body.description;
    var newCampground = { name: name, image: image, description: desc, author: author, price: price };

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
router.get('/new', middleware.isLoggedIn, (req, res) => {
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

//EIDT CAMPGROUND
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render('campgrounds/edit', { campground: foundCampground });
    });
});

//UPODATE CAMPGROUND
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    //find and update the campgroun
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            //redirect to campground
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
});

//DISTROY CAMPGROUNd
router.delete('/:id', middleware.checkCampgroundOwnership, async(req, res) => {
    try {
        let foundCampground = await Campground.findById(req.params.id);
        await foundCampground.remove();
        res.redirect('/campgrounds');
    } catch (error) {
        console.log(error.message);
        res.redirect('/campgrounds');
    }
});

module.exports = router;