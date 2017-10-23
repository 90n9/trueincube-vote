var userModel = require('../models/user-model');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var auth = require("../auth")();

var controller = {};
controller.login = function(req, res, next){
  userModel.findOne({ username: req.body.username }).
  exec( function (err, user) {
    if( ! user ){
      res.status(401).json({message:"no such user found"});
    }
    if(user.password === req.body.password) {
      var payload = {
        userType: 'user',
        id: user._id
      };
      var token = jwt.sign(payload, config.jwtSecret);
      res.json({message: "ok", token: token});
    } else {
      res.status(401).json({message:"passwords did not match"});
    }
  });
}
controller.getList = function(req, res, next){
  userModel
  .find({})
  .select({_id: 0, password:0})
  .exec(function (err, data) {
    if (err) {
      next(err);
    } else {
      res.send({ code: 0, data: data });
    }
  });
}
controller.getData = function(req, res, next){
  userModel
  .findOne({ username: req.params.username })
  .select({_id: 0, password:0})
  .exec( function (err, data) {
    if (err) {
      next(err);
    } else {
      res.send({ code: 0, data: data });
    }
  });
}
controller.insert = function(req, res, next){
  const user = new userModel(
  req.body
  );
  user.save(function (err, data) {
    if (err) {
      next(err)
    } else {
      res.send({ code: 0, data: data });
    }
  });
}
controller.update = function(req, res, next){
  userModel.findById(req.params.id, function(err, user) {
    if (err){
      next(err);
    }
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    var update_password = req.body.password || '';
    if(update_password != ''){
      user.password = update_password;
    }
  
    user.save(function(err) {
      if (err){
        next(err);
      }
      res.send({ code: 0, data: user });
    });
  });
}
controller.delete = function(req, res, next){
  userModel.remove({
    _id: req.params.id
  }, function(err, bear) {
    if (err){
      next(err);
    }
    res.json({code: 0, message: 'Successfully deleted' });
  });
}
module.exports = controller;