var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtOptions = require('../configs/jwt-options');
var userModel = require('../models/user-model');

router.post('/', function (req, res, next) {
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
  }
  // usually this would be a database call:
  //var user = users[_.findIndex(users, {name: name})];

  var user = {
    id: 1,
    name: 'jonathanmh',
    password: '%2yx4'
  };//users[_.findIndex(users, {id: jwt_payload.id})];
  if( ! user ){
    res.status(401).json({message:"no such user found"});
  }

  if(user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.id};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({message: "ok", token: token});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
});

module.exports = router;
