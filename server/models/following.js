const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const followingSchema = new Schema({
      user : {type : Schema.Types.ObjectId, ref : "user", required : "you are not logged in"},
      following: {type: String, required: true}
});

followingSchema.statics.count = function(id){
      return this.findById(id).then(data => {
          return data.length;
      });
  }


mongoose.model('following', followingSchema);