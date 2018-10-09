const graphql = require('graphql');
const ProfileType = require('./types/profile_types');
const auth        = require('../services/auth');
const utils       = require('../services/utils');
const mongoose    = require('mongoose');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = graphql;

const userType = require('./types/user_type');
const AuthService = require('../services/authController');
const ProfileController = require('../services/profileController');
const Profile = mongoose.model('profile');
const followController  = require('../services/followsController');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: userType,
            args: {
                username: {type: GraphQLString},
                password: {type: GraphQLString},
                bio: {type : GraphQLString}
            },
            resolve(parentValue, {username, password, bio}, req){
                // return AuthService.signUp({username, password, req});
                return AuthService.signUp({username, password}).then(user => {
                    ProfileController.AddProfile(user.id, bio);
                    return user;
                })
            }
        },

        login: {
            type: userType,
            args: {
                username: { type: GraphQLString },
                password: {type: GraphQLString }
            },

            resolve(parentValue, {username, password}, req){
                // console.log(req.query.username);
                // console.log(parentValue);
                // console.log(args);
                    
                return AuthService.signIn({username, password});
            }
        },
        AddProfile: {
            type: ProfileType,
            args: {
                bio: { type: GraphQLString },
                user: { type : GraphQLID }
            },
            resolve(parentValue, {bio}, context){
                
                const userId = utils.getUserId(context);

                return ProfileController.AddProfile(bio, userId);

            }
        },

        follow: {
            type : userType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parentValue, {id}, context){
                const userId = utils.getUserId(context);

                return followController.follow(userId, id);
            }
        }
    }
})


module.exports = mutation;