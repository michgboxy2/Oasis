const express = require('express'),
      expressGraphQL = require('express-graphql'),
      cors	  = require("cors"),
      bps	  = require("body-parser"),
      morgan  = require("morgan"),
      app     = express();


      app.use(bps.json());
	  app.use(bps.urlencoded({extended : true}));
	  app.use(cors());
      app.use(morgan("dev"));
      

      app.use('/graphql', expressGraphQL({
        schema : schema, //or just schema
        graphiql: true
    }));


      module.exports = app;