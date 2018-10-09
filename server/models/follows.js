const mongoose =  require('mongoose'),
      Schema   =  mongoose.Schema;


      const followsSchema = new Schema({
          user: {
              type: Schema.Types.ObjectId, ref: 'user'
          },
          following: {
               type: Schema.Types.ObjectId, ref: 'user'
          }
      });


      mongoose.model('following', followsSchema);