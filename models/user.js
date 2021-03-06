var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var validator = require('validator');
var passportLocalMongoose = require('passport-local-mongoose');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function (property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};
/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function (email) {
    return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email, { require_tld: false }));
};
var User = new Schema({


    username: {
        type: String,
        unique: 'Username already exists',
        required: 'Please fill in a username',
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        default: ''
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    roles: {
        type: [{
            type: String,
            enum: ['admin', 'Organisation' , 'Member' ,'sub_admin', "Contact", "Partner"]
        }],
        default: ['Member'],
        required: 'Please provide at least one role'
    },
    created: {
        type: Date,
        default: Date.now
    },
   avatar : {
       type: String,
       default: ''
   },

   Email : {
       type: String,
       default: ''
   } ,
   phone : {
       type: String,
       default: ''
   } ,
   description :{
       type: String,
       default: ''
   } ,
   adress :{
       type: String,
       default: ''
   },
   company :{
       type: String,
       default: ''
   },
   facebook :{
       type: String,
       default: ''
   },
   google :{
       type: String,
       default: ''
   },
   linkedin :{
       type: String,
       default: ''
   },
   twitter :{
       type: String,
       default: ''
   },
   status :{
       type: String,
       default: 'Active'
   }



});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
