var express = require('express');
var passport = require('passport');

var User = require('../models/user');
var nodemailer = require('nodemailer');
var  multer = require("multer");
var router = express.Router();

var storage = multer.diskStorage({ //multers disk storage settings
      destination: function (req, file, cb) {
          cb(null, './angular/assets/img/avatars/');
      },
      filename: function (req, file, cb) {
          var datetimestamp = Date.now();
          cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
      }
  });

  var upload = multer({ //multer settings
                storage: storage
            }).single('file');
//passport routes :
router.get('/', function (req, res) {
    res.json(req.user);
});

router.get('/register', function(req, res) {
    res.render('register', { });
});


router.post("/upload/:id", function(req, res){
console.log(req.params.id)

  upload(req,res,function(err){

             if(err){
                  res.json({error_code:1,err_desc:err});
                  return;
             }

User.findByIdAndUpdate(req.params.id , {$set : {avatar : req.file.filename}}, function(error, up){

  if(err)
  {
    console.log(err);
  }
  res.json(up);
})


});

});

router.post("/send", function(req, res){

  var transporter = nodemailer.createTransport('smtps://marwen.zouebi@gmail.com:vespa123@smtp.gmail.com');
console.log(req.body.content)
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'marwen.zouebi@gmail.com', // sender address
      to: req.body.email, // list of receivers
      subject: req.body.subject,
      text: req.body.content, // plaintext body
      html: req.body.content
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){

return ;
      }
      res.json(info)
  });
})


router.post('/register', function(req, res) {
    User.register(new User({
      username : req.body.username,
      lastName : req.body.lastName,
      firstName : req.body.firstName,
      Email : req.body.Email ,
      phone : req.body.phone ,
      description : req.body.description,
      adress : req.body.adress,
      roles : [req.body.role],
      company : req.body.company,
      facebook : req.body.facebook,
      linkedin : req.body.linkedin,
      twitter : req.body.twitter,
      google : req.body.google

       }), req.body.password, function(err, user) {
        if (err) {
            return ;
        }



        var transporter = nodemailer.createTransport('smtps://marwen.zouebi@gmail.com:vespa123@smtp.gmail.com');

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'marwen.zouebi@gmail.com', // sender address
            to: req.body.Email, // list of receivers
             subject: 'you have already a new account of our platefrom', // Subject line
             text: "user name " + req.body.Email +"  Password "+ req.body.password, // plaintext body
             html: "user name " + req.body.Email +"  Password "+ req.body.password// html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){

console.log(error)
            }
            res.json(user)
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

router.get("/contact", function(req, res){
var contact = [];
User.find({}).exec(function(error, result){
for (var i = 0; i < result.length; i++) {
  if(result[i].roles[0]==="Partner" || result[i].roles[0]==="Contact")
  {
    contact.push(result[i]);
  }
}
res.send(contact);
})
})

router.get("/desactive/:id", function(req, res){


User.findByIdAndUpdate(req.params.id ,{$set : {status :"Desactive" }}, function(err, result){
  res.json(result);

});
});


router.get("/active/:id", function(req, res){



User.findByIdAndUpdate(req.params.id ,{$set : {status :"Active" }}, function(err, result){
  res.json(result);

});
});

router.get("/:id", function(req,res){
User.find({_id : req.params.id}).exec (function(err, result){

  if(err){
    console.log(err);
    return;
  }
  res.json(result[0])
});

});
//end passport route >>

module.exports = router;
