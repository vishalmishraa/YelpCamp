var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//databases
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });

//schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", (req, res) => {
    res.render('landing')
});

app.get('/campgrounds', (req, res) => {
    //get vampground from db
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds', { campgrounds: allCampgrounds });
        }
    })

});

app.post('/campgrounds', (req, res) => {
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image }
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

app.get('/campgrounds/new', (req, res) => {
    res.render('new.ejs');
});

app.listen(7000, () => {
    console.log("server started at : 7000");
});