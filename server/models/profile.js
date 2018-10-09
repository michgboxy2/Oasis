const mongoose =  require('mongoose'),
      Schema   =  mongoose.Schema;


      const ProfileSchema = new Schema({
          user : {
              type: Schema.Types.ObjectId,
              ref:   'user'
            },
          bio  : { type: String },
          
          following : [{
              type : Schema.Types.ObjectId, 
              ref : 'user'
            }],
         followers: [{
            type : Schema.Types.ObjectId, 
            ref : 'user'
         }]
      },{usePushEach : true});
      


      mongoose.model('profile', ProfileSchema);
