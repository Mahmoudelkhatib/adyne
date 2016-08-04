var mongoose = require('mongoose');
var Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
var Meeting = new Schema({
    title:String,
    subject:String,
    adress:String,
    date :{
       date_time : {
         date: String,
         time : String
       },

    },

     date1 : {
       date_time : {
         date: String,
         time : String
       },
       vote : Number
    },

     date2 :{
       date_time : {
         date: String,
         time : String
       },
       vote : Number
    } ,

      date3 :{
       date_time : {
         date: String,
         time : String
       },
       vote : Number
    } ,

    type : String,
    duration:String,
    created:Date ,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    participants : [
        {
          type: Schema.ObjectId,
          ref: 'User'
        }
     ]

});
Meeting.plugin(autoIncrement.plugin, 'Meeting');
module.exports = mongoose.model('Meeting', Meeting);
