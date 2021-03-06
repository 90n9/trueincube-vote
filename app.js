var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config/config');
var auth = require("./auth")();

var index = require('./routes/index-route');
var userLogin = require('./routes/userlogin-route');
var user = require('./routes/user-route');
var project = require('./routes/project-route');
var vote = require('./routes/vote-route');
var report = require('./routes/report');

mongoose.connect(config.mongoUri, { useMongoClient: true, promiseLibrary: global.Promise });

var app = express();
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

//init jwt authen
app.use(auth.initialize());

app.use('/', index);
app.use('/userlogin', userLogin);
app.use('/user', user);
app.use('/project', project);
app.use('/report', report);
app.use('/vote', auth.authenticate(), vote);


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
