const graphql = require('graphql');
const ProfileType = require('./types/profile_types');
const auth        = require('../services/auth');
const utils       = require('../services/utils');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = graphql;

const userType = require('./types/user_type');
const AuthService = require('../services/authController');
// const ProfileType = require('./profile_types');
const ProfileController = require('../services/profileController');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: userType,
            args: {
                username: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parentValue, {username, password}, req){
                return AuthService.signUp({username, password, req});
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
        }
    }
})


module.exports = mutation;