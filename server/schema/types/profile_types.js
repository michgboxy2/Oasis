const graphql = require('graphql');
const mongoose = require('mongoose');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList}      = graphql;
const Profile   = mongoose.model('profile');
const utils     = require('../../services/utils');
const user      = mongoose.model('user');
const ProfileController = require('../../services/profileController');
const UserTypes         = require('./user_type');
const FollowController  = require('../../services/followsController');
const FollowType        = require('../types/followsType');


const ProfileType    = new GraphQLObjectType({
    name  : 'ProfileType',
    fields: () => ({
        id : { type : GraphQLID },
        bio: {type: GraphQLString },
        user: {
            type : require('./user_type'),
            resolve(parentValue, args, context){
                const userId = utils.getUserId(context);
                return ProfileController.getUserProfile(userId).then(profile => { 
                
                return profile.user});
            }
        },
        following: {
            type : new GraphQLList(UserTypes),
            resolve(parentValue, args, context){
                const userId = utils.getUserId(context);
                return ProfileController.getFollowList(userId);
            }
        },
        followers: {
            type : new GraphQLList(UserTypes),
            resolve(parentValue, args, context){
                const userId = utils.getUserId(context);
                return ProfileController.getFollowersList(userId);
            }
        },
        followingCount: {
            type : GraphQLInt,
            resolve(parentValue, args, context){
                const userId = utils.getUserId(context);
                return FollowController.followingCount(userId);
            }
        },
        followersCount: {
            type: GraphQLInt,
            resolve(parentValue, args, context){
                const userId = utils.getUserId(context);
                return FollowController.followersCount(userId);
            }
        }
    })
});

module.exports = ProfileType;