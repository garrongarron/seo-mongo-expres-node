const passport = require('passport');
const express = require('express');
const router = express.Router();


const User = require('../models/user');

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/notAllow')
}


  

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/auth/ok',
    failureRedirect: '/auth/fail',
    failureFlash: true
}));

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/auth/ok',
    failureRedirect: '/auth/fail',
    failureFlash: true
}));


router.post('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/auth/out');
});



router.get('/ok', (req, res, next) => {
    console.log(req.isAuthenticated())
    res.status(201).json({
        message: 'ok'
    });
});

router.get('/fail', (req, res, next) => {
    res.status(201).json({
        message: 'fail'
    });
});

router.get('/pepe', (req, res, next) => {
    res.render('index');
});

router.get('/out', (req, res, next) => {
    res.status(201).json({
        message: 'out'
    });
});


router.get('/notAllow', (req, res, next) => {
    res.status(201).json({
        message: 'notAllow'
    });
});

module.exports = router;