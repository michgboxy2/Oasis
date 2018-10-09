const mongoose = require('mongoose'),
      Follows  = mongoose.model('following'),
      Followers = mongoose.model('followers'),
      User      = mongoose.model('user'),
      Profile   = mongoose.model('profile');


    //add userId to the following array list of logged in User;
    const CheckFollow = (ownId, UserId, follow) => {
         return  Profile.findOne({user : ownId}).then(profile => {
              
            profile.following.push(UserId);
           return profile.save();           
          })
    }

    //check if user is already in logged in user following array and removes him from the list, hence unfollowing.
    const alreadyFollowing = (ownId, UserId) => {
        return Profile.findOne({user : ownId}).then(profile => {
            if(profile.following.indexOf(UserId) > -1 ){
                profile.following.splice(profile.following.indexOf(UserId), 1);
                return profile.save();
            }
        })
    }
     
    
    exports.follow = (ownId, UserId) => { //ownId is the ID of the signed in User// UserId is the id of the user you want to follow
                if(ownId === UserId){
                    return new Error("you can't follow yourself");
                }

                const follows = new Follows({user : ownId, following : UserId});
                const followers = new Followers({user: UserId, followers : ownId});
                
                Profile.findOne({user : UserId}).then(profile => {
                    if(profile.followers.indexOf(ownId) > -1 ){ //check if logged in user is already a follower, if yes, deletes logged in user from follower array
                       
                        profile.followers.splice(profile.followers.indexOf(ownId), 1);
                        alreadyFollowing(ownId, UserId);
                        return profile.save();
                    }

                    profile.followers.push(ownId);
                    return Promise.all([follows.save(), profile.save(), followers.save()])
                    .then(([profile, follow]) => profile)
                    .then(follow => {
                        CheckFollow(ownId, UserId);
                    })
                    return profile;
                })

      }

      exports.followingCount = (ownId) => {
            return Profile.findOne({user : ownId})
            .then(profile => {
                return profile.following.length++;
            })
      }

      exports.followersCount = (ownId) => {
        return Profile.findOne({user : ownId})
        .then(profile => {
            return profile.followers.length;
        })
  }

      exports.getFollowings = (id) => {
          return Follows.find({user : id})
          .populate('following').
          then(data => {
              return data;
          }
          )
      }