var passport = require("passport");  
var passportJWT = require("passport-jwt");  
var userModel = require("./models/user-model");  
var config = require("./config/config");  
var ExtractJwt = passportJWT.ExtractJwt;  
var Strategy = passportJWT.Strategy;  
var params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
};

module.exports = function() {
  var strategy = new Strategy(params, function(payload, done) {
    if(payload.userType == 'user'){
      userModel.findOne({ _id: payload.id }).
      exec( function (err, user) {
        if (user) {
          return done(null, {
            userType: 'user',
            user: user
          });
        } else {
          return done(new Error("User not found"), null);
        }
      });
    }else if(payload.userType == 'admin'){
      //
    }
  });
  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", config.jwtSession);
    }
  };
};