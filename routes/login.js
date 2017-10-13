var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var cfg = require('../config.js');
var auth = require("../auth.js")();
var userModel = require('../models/user-model');

router.post('/', function (req, res, next) {
  userModel.findOne({ username: req.body.username }).
  exec( function (err, user) {
    if( ! user ){
      res.status(401).json({message:"no such user found"});
    }
    if(user.password === req.body.password) {
      var payload = {id: user._id};
      var token = jwt.sign(payload, cfg.jwtSecret);
      res.json({message: "ok", token: token});
    } else {
      res.status(401).json({message:"passwords did not match"});
    }
  });
});

module.exports = router;
