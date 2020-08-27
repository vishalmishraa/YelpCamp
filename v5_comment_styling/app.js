//variables
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var seedDB = require('./seeds');
var Comment = require('./models/comment')



//databases- CONNECTING 
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
//ACCESING variables
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
// seedDB();




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
            res.render('campgrounds/index', { campgrounds: allCampgrounds });
        }
    });

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
    res.render('campgrounds/new');
});


//SHOW MORE INFO ABOUNT ONE CAMGROUNDS
app.get("/campgrounds/:id", (req, res) => {
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


//++++++++++++++++++++++++++++++++
//COO=MMENTS ROUTES
//++++++++++++++++++++++++++++++++


app.get('/campgrounds/:id/comments/new', (req, res) => {
    //find by if
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', { campground: campground });

        }
    });
});

app.post('/campgrounds/:id/comments', (req, res) => {
    //lookupo camground s by id
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err)
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err)
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    //create new coments
    //correcr nrew camments to campgrounds
    //redirect to campground show page
});


//PORT LISTNER
app.listen(7000, () => {
    console.log("server started at : 7000");
});