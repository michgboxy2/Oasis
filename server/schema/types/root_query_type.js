const graphql  = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull}   = graphql;
const UserType = require('./user_type');
const ProfileType = require('./profile_types');
const FollowType  = require('./followsType');
const profileController = require('../../services/profileController');
const FollowController  = require('../../services/followsController');
const AuthController    = require('../../services/authController');
const mongoose          = require('mongoose');
const Users             = mongoose.model('user');
const utils             = require('../../services/utils');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return AuthController.getAllUsers();
            }
        },

        user: {
            type: UserType,
            args: {id : {type : new GraphQLNonNull(GraphQLID)}},
            resolve(parentValue, {id}, context){
                return AuthController.getOneUser(id);
            }
        },

        loggedOnUser: {
            type: UserType,
            resolve(parentValue, args, context){
                const userId = utils.getUserId(context);
                return AuthController.getOneUser(userId);
            }
        },

        profiles: {
            type : ProfileType,
            resolve(parentValue, args, req){
                return profileController.getAllProfiles();
            }
        },

        profile: {
            type: ProfileType,
            resolve(parentValue, args, context){
                const userId = utils.getUserId(context);
                return profileController.getUserProfile(userId);
            }
        },

        followings: {
            type: new GraphQLList(FollowType),
            resolve(parentValue, args, context){
                const userId = utils.getUserId(context);
                // return FollowController.getFollowings(userId);
                return profileController.getFollowList(userId).then(user => {
                    return user.following;
                })
            }
        }

    }
});

module.exports = RootQueryType;