const mongoose = require('mongoose'),
      Profile  = mongoose.model('profile');
      User     = mongoose.model('user');




exports.AddProfile = (bio, userID) => {
    const profile = new Profile({bio,
        user: userID});

    if(!bio) throw new Error("input Bio");
    return profile.save();
}

exports.getUserProfile = (id) => {
   return Profile.findOne({user : id}).populate('user');
}

exports.getAllProfiles = () => {
    Profile.find().then(data => {
        if(!data) throw new Error("can't list profiles");
        return data;
    }, (err) => { throw err;})
}