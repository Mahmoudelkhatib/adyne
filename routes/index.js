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

router.get("/sub_admin", function(req, res){
var sub_admin = [];
User.find().exec(function(error, result){
  if(error)
  {
    res.send(error);
  }
  else
  {
    for (var i = 0; i < result.length; i++) {
    if (result[i].roles[0]==="sub_admin")
    {
      sub_admin.push(result[i]);
    }
    }
    res.send(sub_admin)
  }
})

})
//end passport route >>

module.exports = router;
