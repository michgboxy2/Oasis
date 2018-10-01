const mongoose = require('mongoose'),
      graphql  = require('graphql'),
      followersType = require('follow_type'),
      followingType = require('following_type'),
      Profile       = mongoose.model('profile'),

      {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList }       = graphql;


      const ProfileType = new GraphQLObjectType({
          name : "ProfileType",
          fields: () => ({
              id : {type : GraphQLID},
              photo: {type : GraphQLString},
              bio: {type: GraphQLString},
              followers: new GraphQLList(followersType),
              resolve(parentValue){
                  return Profile.getFollowers(parentValue.id);
              },
              following: new GraphQLList(followingType),
              resolve(parentValue){
                  return Profile.getFollowing(parentValue.id);
              }
          })
      })



      module.exports = ProfileType;