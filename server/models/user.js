const bcrypt = require('bcrypt-nodejs'),
      mongoose = require('mongoose'),
      Schema   = mongoose.Schema;


const User = new Schema({
      username : {type : String, required : "Enter your username",unique: true },
      password: {type: String, required : "Enter Password"},
      profile: {type : Schema.Types.ObjectId, ref: 'profile'}
});

User.pre('save', function(next){
      this.password = this.encryptPassword(this.password);
      next();
});

User.methods = {
      authenticate : function(plaintext){
            return bcrypt.compareSync(plaintext, this.password);
      },

      encryptPassword : (plaintext) => {
            if(!plaintext){ return next(new Error({message : "Enter credentials"}));}
            
            var salt = bcrypt.genSaltSync();
            
            return bcrypt.hashSync(plaintext, salt);
      }
};

// User.statics.getProfile = function(id){
//       return this.findById(id)
//       .populate('profile')
// }

mongoose.model("user", User);