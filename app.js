var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");

var jwtOptions = require("./configs/jwt-options");

var index = require('./routes/index');
var login = require('./routes/login');
var user = require('./routes/user');
var project = require('./routes/project');
var vote = require('./routes/vote');

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true, promiseLibrary: global.Promise });

//var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
//var jwtOptions = {}
//jwtOptions.jwtFromRequest = ExtractJwt.versionOneCompatibility({authScheme: 'Bearer'});
//jwtOptions.secretOrKey = 'tasmanianDevil';
var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = {
    id: 1,
    name: 'jonathanmh',
    password: '%2yx4'
  };//users[_.findIndex(users, {id: jwt_payload.id})];
  var user = false;
  if (user) {
    console.log('user', user);
    next(null, user);
  } else {
    console.log('not found user', user);
    next(null, false);
  }
});
passport.use(strategy);

var app = express();

app.use(passport.initialize());

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', login);
app.use('/user', passport.authenticate('jwt', { session: false }), user);
app.use('/project', passport.authenticate('jwt', { session: false }), project);
app.use('/vote', passport.authenticate('jwt', { session: false }), vote);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ code: err.status || 500 , data: err.message});
});

module.exports = app;
