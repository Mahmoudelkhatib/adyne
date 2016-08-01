var express = require('express');
var passport = require('passport');

var Meeting = require('../models/meeting');
var router = express.Router();


router.get('/', function (req, res) {
    Meeting.find().exec(function (err, meetings) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(meetings);
        }
    });
});

router.get('/:id', function (req, res, next) {
    Meeting.findById(req.params.id).populate('user').exec(function (err, meeting) {
        if (err) {
            res.json({error: err});
        } else {
            meeting.isCurrentUserOwner = req.user && meeting.user && meeting.user._id.toString() === req.user._id.toString() ? true : false;
            res.json(meeting);
        }
    });
});

router.post  ('/', function (req, res) {
    var meeting = new Meeting({
        title : req.body.title ,
        subject : req.body.subject ,
        description : req.body.description,
        adress : req.body.adress, 
        start : req.body.start,
        duration : req.body.duration,
        user : req.body.user,
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
    Meeting.findByIdAndUpdate(req.params.id, {$set: {titre: req.body.titre}}, {new: true}, function (err, meeting) {
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
