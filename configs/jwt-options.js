var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'tasmanianDevil';

module.exports = jwtOptions;