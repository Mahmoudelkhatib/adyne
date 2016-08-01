var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Meeting = new Schema({
    title:String,
    subject:String,
    adress:String,
    date :String ,
    heure :String,
    date1 :String ,
    heure1 :String,
    date2 :String ,
    heure2 :String,
    date3 :String ,
    heure3 :String,
    type : String,
    duration:String,
    created:Date ,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('Meeting', Meeting);
