var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Meeting = new Schema({
    title:String,
    subject:String,
    adress:String,
    start:String ,
    type : String,
    duration:String,
    created:Date ,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('Meeting', Meeting);
