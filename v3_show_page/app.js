//variables
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//ACCESING variables
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//databases- CONNECTING 
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });

//SCHEMA setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//databses MODELING
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "hills",
//     image: "https://images.unsplash.com/photo-1574007664663-af46c1f3636c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
//     description: "this is beutifull hills without electricity,enjoying verry well"
// }, (err, campground) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED CAMPGRPUND");
//         console.log(campground);
//     }
// });
//LANDING PAGE
app.get("/", (req, res) => {
    res.render('landing')
});


//INDEX - SHOW OUR CAMPGROUND
app.get('/campgrounds', (req, res) => {
    //get vampground from db
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { campgrounds: allCampgrounds });
        }
    })

});


//CREATE NEW CAMP GRPOUND TO DATABSED
app.post('/campgrounds', (req, res) => {
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = { name: name, image: image, description: desc };

    //create a new campground and save to data base
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err)
        } else {
            //redirct back to campgroud page 
            res.redirect('/campgrounds')
        }
    })

});


//SHOW FORM TO CREATE NEW CAMPGROUNDS
app.get('/campgrounds/new', (req, res) => {
    res.render('new.ejs');
});


//SHOW MORE INFO ABOUNT ONE CAMGROUNDS
app.get("/campgrounds/:id", (req, res) => {
    //FIND THE CAMPGRPIUND WITH PROVIDED ID
    Campground.findById(req.params.id, (err, foundCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            //RENDER SHOW TEMPLATE WITH THAT CAMPGROUNDS\
            res.render("show", { campgrounds: foundCampgrounds });
        }
    })

});


//PORT LISTNER
app.listen(7000, () => {
    console.log("server started at : 7000");
});