const graphql = require('graphql');
const mongoose = require('mongoose');
const {GraphQLObjectType, GraphQLID, GraphQLString }      = graphql;
const Profile   = mongoose.model('profile');
const utils     = require('../../services/utils');
const user      = mongoose.model('user');
const ProfileController = require('../../services/profileController');


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
        }
    })
});

module.exports = ProfileType;