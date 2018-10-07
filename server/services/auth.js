const expressjwt  = require("express-jwt"),
      jwt         = require("jsonwebtoken"),
      mongoose   = require('mongoose'),
	  User        = mongoose.model('user'),
	  bcrypt      = require('bcrypt-nodejs'),
      checkToken  = expressjwt({secret : "jsonweb"});
      

      exports.decodeToken = (context, res, next) => {
          checkToken(context, res, next);

      }

      exports.verifyUser = ({username, password},next) => {
          var username = username;
          var password = password;

          if(!username || !password){ return next(new Error("Enter your credentials"));}

          User.findOne({username}).then(function(user){
            
              if(!user){ return next(new Error("incorrect credentials"));}

              if(!User.authenticate(password)){
                  return next(new Error("incorrect credentials"));
              }

              req.user = user;
              next();
          }, (err) => { return next(err);
        })
      }

      exports.signToken = (id) => {
          return jwt.sign(
              {id : id},
              "jsonweb",
              {expiresIn: 24 * 7 * 3600}
          )
      }