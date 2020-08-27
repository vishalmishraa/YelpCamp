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

//SHOW REGISTER FORM
router.get('/register', (req, res) => {
    res.render("register");
});

//HANDLE SIGN UP LOGIC
router.post('/register', (req, res) => {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('resgister');
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/campgrounds');
        });
    });
});

//SHOW LOGIN FORM
router.get('/login', (req, res) => {
    res.render('login');
});

//HANDLE LOGIN LOGIC
router.post('/login', passport.authenticate('local', {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {});

//LOG OUT ROUTE
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;