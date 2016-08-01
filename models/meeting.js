var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Meeting = new Schema({
    title:String,
    subject:String,
    description:String,
    start:Date ,
    duration:Number,
    created:Date ,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('Meeting', Meeting);
