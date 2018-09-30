const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

      const commentSchema = new Schema({
          content : {type : String, required : true},
          user    : {type : Schema.Types.ObjectId, ref : 'user', required : "you must be logged in"},
          post    : {type : Schema.Types.ObjectId, ref: 'post'}
      });

      mongoose.model('comment', commentSchema);