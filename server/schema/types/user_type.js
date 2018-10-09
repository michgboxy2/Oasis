const graphql  =  require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} = graphql;

const profileController = require('../../services/profileController');

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type : GraphQLString },
        token:{type : GraphQLString},
        profile:{
            type: require('./profile_types'),
            resolve(parentValue, args, context){
                return profileController.getUserProfile(parentValue.id);
            }
        }

    })
});

module.exports = UserType;