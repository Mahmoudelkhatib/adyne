var express = require('express');
var passport = require('passport');

var Event = require('../models/event');
var router = express.Router();

router.get('/add', function (req, res) {

    res.render('event/add.twig');

});
router.get('/', function (req, res) {
    Event.find().exec(function (err, events) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(events);
        }
    });
});

router.get('/:id', function (req, res, next) {
    Event.findById(req.params.id).populate('user').exec(function (err, event) {
        if (err) {
            res.json({error: err});
        } else {
            event.isCurrentUserOwner = req.user && event.user && event.user._id.toString() === req.user._id.toString() ? true : false;
            res.json(event);
        }
    });
});

router.post  ('/', function (req, res) {
    var event = new Event({
title : req.body.title ,
description : req.body.description,
start : req.body.start,
end : req.body.end,
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

router.put('/:id', function (req, res) {
    Event.findByIdAndUpdate(req.params.id, {$set: {titre: req.body.titre}}, {new: true}, function (err, event) {
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
