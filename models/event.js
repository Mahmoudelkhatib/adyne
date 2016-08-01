var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Event = new Schema({
    title:String,
    description:String,
    start:Date ,
    end: Date ,
    created:Date ,

    user: {

        type: Schema.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('Event', Event);
