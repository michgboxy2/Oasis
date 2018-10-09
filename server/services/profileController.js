const mongoose = require('mongoose'),
      Profile  = mongoose.model('profile'),
      User     = mongoose.model('user');




exports.AddProfile = (userID, bio) => {
    const profile = new Profile({
        user: userID});

    return profile.save().then(profile => {
        return profile;
    });
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

exports.getFollowList = (id) => {
   return Profile.findOne({user : id})
   .populate('following')
   .then(profile => {
        if(!profile){ return new Error("user does not exist")};
        console.log(profile);
        return profile.following;
    }
    )
}


exports.getFollowersList = (id) => {
    return Profile.findOne({user : id})
    .populate('followers')
    .then(profile => {
         if(!profile){ return new Error("user does not exist")};
         console.log(profile.followers);
         return profile.followers;
     }
     )
 }
