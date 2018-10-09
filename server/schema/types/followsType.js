const graphql  =  require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = graphql;

const profileController = require('../../services/profileController');
const FollowController  = require('../../services/followsController');
const utils     = require('../../services/utils');
const UserType   = require('../types/user_type');

const FollowType = new GraphQLObjectType({
    name: 'FollowType',
    fields: () => ({
        id : {type : GraphQLID},
        username : {type : GraphQLString}

        
    })
});

module.exports = FollowType;