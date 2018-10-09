const express = require('express'),
      models  = require('./models'),
    //   auth    = require('./services/auth'),
      mongoose = require('mongoose'),
      schema  = require('./schema/schema'),
      expressGraphQL = require('express-graphql'),
      cors	  = require("cors"),
      bps	  = require("body-parser"),
      morgan  = require("morgan"),
      app     = express();

      const Mongo_URI = 'mongodb://michgboxy:password1@ds119993.mlab.com:19993/instagram'

      mongoose.Promise = global.Promise;
      mongoose.connect(Mongo_URI);


      mongoose.connection
          .once('open', () => console.log('Connected to MongoLab instance.'))
          .on('error', error => console.log('Error connecting to MongoLab:', error));

      app.use(bps.json());
      
      app.use(bps.urlencoded({extended : true}));
      
      app.use(cors());
      
      app.use(morgan("dev"));

    //   app.use(auth.decodeToken);
      

      app.use('/graphql', expressGraphQL({
        schema : schema, //or just schema
        graphiql: true,
        rootValue: global
    }));
    


      module.exports = app;