var express = require('express');
var passport = require('passport');

var Meeting = require('../models/meeting');
var nodemailer = require('nodemailer');
var router = express.Router();



router.get("/", function(req, res){


Meeting.find({}).populate("participants").exec(function(err, result){
  res.send(result)
})

})


router.get("/calendar", function(req, res){
   calendar_model = []
  Meeting.find({}).exec(function(err, result){

  for (var i = 0; i < result.length; i++) {

if (result[i].type ==="Regular meeting")
{
  calendar_model.push({id :result[i]._id  , title:result[i].title+"("+result[i].type+")" , start : result[i].date.date_time.date , color : "#689f38"})
}


    else if (result[i].type ==="Variable meeting")
    {

      var start_date="";
      if (result[i].date1.vote >result[i].date2.vote && result[i].date1.vote >result[i].date3.vote)
{
    start_date=result[i].date1.date_time.date
}
else if (result[i].date2.vote >result[i].date1.vote && result[i].date1.vote >result[i].date3.vote)
{
start_date=result[i].date2.date_time.date
}

else if (result[i].date3.vote >result[i].date1.vote && result[i].date3.vote >result[i].date2.vote)
{

  start_date=result[i].date3.date_time.date
}

    calendar_model.push({id :result[i]._id , title:result[i].title+"("+result[i].type+")" , start : start_date , color : "#039be5"})

}

else if (result[i].type ==="Other type")
{

  var start_date2="";
  if (result[i].date1.vote >result[i].date2.vote && result[i].date1.vote >result[i].date3.vote)
{
start_date2=result[i].date1.date_time.date
}
else if (result[i].date2.vote >result[i].date1.vote && result[i].date1.vote >result[i].date3.vote)
{
start_date2=result[i].date2.date_time.date
}

else if (result[i].date3.vote >result[i].date1.vote && result[i].date3.vote >result[i].date2.vote)
{

start_date2=result[i].date3.date_time.date
}

calendar_model.push({id : result[i]._id , title:result[i].title+"("+result[i].type+")" , start : start_date2 , color : "#d81b60"})

}


}

  res.send(calendar_model);
});
});
//
//
router.get('/:id', function (req, res, next) {
    Meeting.findById(req.params.id).exec(function (err, meeting) {
        if (err) {
            res.json({error: err});
        } else {
            //meeting.isCurrentUserOwner = req.user && meeting.user && meeting.user._id.toString() === req.user._id.toString() ? true : false;
            res.json(meeting);
        }
    });
});

router.post  ('/', function (req, res) {
//var test = JSON.parse(req.body.members);
/*
var users = [];
    for (var i = 0; i < JSON.parse(req.body.members).length; i++) {
    users.push({user :JSON.parse(req.body.members)[i]})
    }

    console.log(users)
  */
/*
  var test =JSON.parse(JSON.stringify(req.body.members.toString()))
  var test2=JSON.parse(test);
*/



console.log(JSON.parse(req.body.date))
    var meeting = new Meeting({
        title : req.body.title ,
        subject : req.body.subject ,
        description : req.body.description,
        adress : req.body.adress,
        date : JSON.parse(req.body.date),
        date1 :JSON.parse(req.body.date1),
        date2 : JSON.parse(req.body.date3),
        date3 : JSON.parse(req.body.date2),
        user : req.body.user,
        participants: JSON.parse(req.body.members),
        type : req.body.type,
        created : new Date()

    });

    meeting.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(meeting);
        }
    });
});

router.put('/:id', function (req, res) {
    Meeting.findByIdAndUpdate(req.params.id, {$set: {

      title : req.body.title ,
      subject : req.body.subject ,
      description : req.body.description,
      adress : req.body.adress,
      date : JSON.parse(req.body.date),
      date1 :JSON.parse(req.body.date1),
      date2 : JSON.parse(req.body.date3),
      date3 : JSON.parse(req.body.date2),
      user : req.body.user,
      participants: JSON.parse(req.body.members),
      type : req.body.type,






    }}, function (err, meeting) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(meeting);
        }
    });
});
router.delete('/:id', function (req, res, next) {
    Meeting.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.json({error: err});
        } else {
            res.json({ message: 'Successfully deleted' });
        }
    });
});





module.exports = router;
