const mongoose = require('mongoose'),
      graphql  = require('graphql'),

      {GraphQLObjectType, GraphQLID, GraphQLString }       = graphql;

    const User = mongoose.model("user");
    const Profile = mongoose.model('profile');

      const UserType = new GraphQLObjectType({
          name : "UserType",
          fields: () => ({
              id : {type : GraphQLID },
              username: {type : GraphQLString },
              profile : {
                  type: require('./profile_type'),
                  resolve(parentValue){
                      return User.findById(parentValue).populate('profile')
                      .then(user => {
                          return user.profile
                      });


                  }
              }
          })
      })

module.exports = UserType;
      


