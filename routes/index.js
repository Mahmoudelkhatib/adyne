var express = require('express');
var passport = require('passport');

var User = require('../models/user');
var router = express.Router();

//passport routes :
router.get('/', function (req, res) {
    res.json(req.user);
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
            return res.json(user);
        }

        passport.authenticate('local')(req, res, function () {
            return res.json(user);
        });
    });
});

router.get('/login', function (req, res) {
    res.json(req.user);
});

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.json(req.user);
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function (req, res) {
    res.status(200).send("test!");
});
//end passport route >>

module.exports = router;
