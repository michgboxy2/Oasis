const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

      const ProfileSchema = new Schema({
        photo : {type : String},
        
        user : { 
              type : mongoose.Schema.Types.ObjectId, 
              ref : 'user', 
              required : "You must be logged in"
            },

        bio : {type : String},
          
        followers : [{ //those following me
              type : Schema.Types.ObjectId, 
              ref: "follower"
            }],
          
        following : [{ //those i'm following
                type : Schema.Types.ObjectId, 
                ref: "following"
              }]
      }, {usePushEach : true });

// ProfileSchema.statics.followOomf = function(id, next){
//     const Follow = mongoose.model('following');
    
//     return this.findById(id).then(following => {
//         if(!following){return next(new Error("can't find user"))};
//             const follow = new Follow({following});
//             profile.following.push(follow);
//             return Promise.all([follow.save(), profile.save()])
//             .then(([follow, profile]) => profile);
//             return profile;       
//     }, (err) => {return next(err);})
// }

ProfileSchema.statics.unfollowOomf = function(id, next){  //following and unfollowing
    const Following = mongoose.model('following');
    this.following.findByIdAndRemove(id, next).then(unfollowed => {
        if(!unfollowed){ return profile};
        const follow = new Following({following : unfollowed});
        profile.following.push(follow);
        return Promise.all([follow.save(), profile.save()])
        .then(([follow, profile]) => profile);
        return profile;

    }, (err) => {return next(err);})
}

ProfileSchema.statics.FollowMe = function(id, next){  //getting followed and unfollowed
    const Follower = mongoose.model('follower');

    this.followers.findByIdAndRemove(id).then(data => {
        if(!data){ //not a follower
            const follower = new Follower({follow : id});
            this.followers.push(follower);
            return Promise.all([profile.save(), follower.save()])
            .then(([follower, profile]) => profile);
            return profile;
        }
        return profile;

    }, (err) => {return next(err);})
}
