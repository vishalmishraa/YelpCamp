const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user');

//LANDING PAGE
router.get("/", (req, res) => {
    res.render('landing')
});

//=================================
//AUTH ROUTES
//==================================

// show register form
router.get("/register", function(req, res) {
    res.render("register", { page: 'register' });
});

//show login form
router.get("/login", function(req, res) {
    res.render("login", { page: 'login' });
});
//HANDLE SIGN UP LOGIC
router.post('/register', (req, res) => {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            req.flash('error', err.message);
            console.log("============== " + err + " ==========================");
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, () => {
            req.flash('success', "Welcome to YelpCamp " + user.username);
            res.redirect('/campgrounds');
        });
    });
});

// //SHOW LOGIN FORM
// router.get('/login', (req, res) => {
//     res.render('login');
// });

//HANDLE LOGIN LOGIC
router.post('/login', passport.authenticate('local', {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {});

//LOG OUT ROUTE
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Logged You Out!")
    res.redirect("/campgrounds");
});

module.exports = router;