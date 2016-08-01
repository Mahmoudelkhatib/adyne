var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash    = require('connect-flash');
var routes = require('./routes/index');
var event = require('./routes/event');
var meeting = require('./routes/meeting');
var cors = require("cors");
var app = express();

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('secret app'));
app.use(session({
    secret: 'secret app',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/event', event);
app.use('/meeting', meeting);

var User = require('./models/user');
// passport config
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            return done(null, user);
        });
    }
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// mongoose

mongoose.connect('mongodb://adyne:adyne@ds029705.mlab.com:29705/adyne');
module.exports = app;
