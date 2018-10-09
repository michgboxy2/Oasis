const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcrypt-nodejs');

const UserSchema = new Schema({
    username: { type : String, required: true, unique: true},
    password: {type : String, required: true, unique: true}
});

UserSchema.pre('save', function(next){
    this.password = this.encryptPassword(this.password);
    next();
});

UserSchema.methods = {
    authenticate : function(plaintext){
        return bcrypt.compareSync(plaintext, this.password);
    },

    encryptPassword : (plaintext) => {
        if(!plaintext){ return next(new Error("please enter username or password"));}

        var salt = bcrypt.genSaltSync();

        return bcrypt.hashSync(plaintext, salt);

    }
}

// UserSchema.virtual('followings', {
//     ref: 'following',
//     localField: 'id',
//     foreignField: 'user'
// })

mongoose.model('user', UserSchema);