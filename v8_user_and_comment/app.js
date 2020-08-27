//variables
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    Campground = require('./models/campground'),
    User = require('./models/user'),
    seedDB = require('./seeds'),
    Comment = require('./models/comment');

//REQUIRING ROUTES
const commentRoutes = require('./routes/comment'),
    campgroundRoutes = require('./routes/capgrounds'),
    indexRoute = require('./routes/index');


//databases- CONNECTING 
mongoose.connect("mongodb://localhost:27017/yelp_camp_v6", { useNewUrlParser: true, useUnifiedTopology: true });
//ACCESING variables
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

// seedDB();//see the database

//PASSPORT CONFIG
app.use(require('express-session')({
    secret: "vishal is awesome",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

//USING ROUTES
app.use("/", indexRoute);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

//PORT LISTNER
app.listen(7000, () => {
    console.log("server started at : 7000");
});