var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Event = new Schema({
    title:String,
    description:String,
    start_date:String ,
    start_time : String ,
    end_date:String ,
    end_time : String ,
    created:Date ,
    adress : String , 

    user: {

        type: Schema.ObjectId,
        ref: 'User'
    },
    participants : [
        {
          type: Schema.ObjectId,
          ref: 'User'
        }
     ],
     image_album : [String]
});
module.exports = mongoose.model('Event', Event);
