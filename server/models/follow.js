const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const followerSchema = new Schema({
      user : {type : Schema.Types.ObjectId, ref : "user", required : "you are not logged in"},
      follow: {type: String, required: true}
});


followerSchema.statics.count = function(id){
    return this.findById(id).then(data => {
        return data.length;
    });
}


mongoose.model('follower', followerSchema);