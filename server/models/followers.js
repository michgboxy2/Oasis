const mongoose =  require('mongoose'),
      Schema   =  mongoose.Schema;


      const followersSchema = new Schema({
          user: {
              type: Schema.Types.ObjectId, ref: 'user'
          },
          followers: {
               type: Schema.Types.ObjectId, ref: 'user'
          } 
      });

      function autopopulate(next){
          this.populate('followers');
          next();
      }


      mongoose.model('followers', followersSchema);