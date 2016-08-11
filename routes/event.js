var express = require('express');
var passport = require('passport');
var  multer = require("multer");
var Event = require('../models/event');
var router = express.Router();



var  storage = multer.diskStorage({ //multers disk storage settings
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
            }).array('file');


      router.get('/', function (req, res) {
                Event.find({}).exec(function (err, events) {
                    if (err) {
                        return ;
                    } else {
                        res.json(events);
                    }
                });
            })

router.get("/calendar", function(req, res){

var result = [];
Event.find({}).exec(function(err, events){

  for (var i = 0; i < events.length; i++) {
    result.push({id:events[i]._id ,title : events[i].title , start: events[i].start_date, end : events[i].end_date});
  }
  res.json(result);
})

})

router.get("/all", function(req, res){


Event.find({}).exec(function(err, events){

res.json(events)
})

})

router.get('/:id', function (req, res, next) {
    Event.findById(req.params.id).populate('user').exec(function (err, event) {
        if (err) {
            res.json({error: err});
        } else {

            res.json(event);
        }
    });
});

router.post  ('/', function (req, res) {
    var event = new Event({
adress : req.body.adress,
title : req.body.title ,
description : req.body.description,
start_date : req.body.start_date,
start_time : req.body.start_time,
end_date : req.body.end_date,
end_time : req.body.end_time,


created : new Date()


    });
//    event.user = req.user;

    event.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(event);
        }
    });
});


router.post("/upload/:id", function(req, res){

  var files = [];
   upload(req,res,function(err){
              if(err){
                   res.json({error_code:1,err_desc:err});
                   return;
              }

  for (var i = 1; i < req.files.length; i++) {
  files.push(req.files[i].filename)

  }

              Event.findByIdAndUpdate(req.params.id, {$set: { image_album:files }}, function(err, product) {
              res.send ({done:1});
            });




        });

});
router.put('/:id', function (req, res) {
    Event.findByIdAndUpdate(req.params.id, {$set: {
      adress : req.body.adress,
      title : req.body.title ,
      description : req.body.description,
      start_date : req.body.start_date,
      start_time : req.body.start_time,
      end_date : req.body.end_date,
      end_time : req.body.end_time,


    }}, function (err, event) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(event);
        }
    });
});
router.delete('/:id', function (req, res, next) {
    Event.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.json({error: err});
        } else {
            res.json({ message: 'Successfully deleted' });
        }
    });
});
module.exports = router;
