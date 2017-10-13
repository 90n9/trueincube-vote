var express = require('express');
var router = express.Router();
var user_model = require('../models/user');

router.get('/', function(req, res, next) {
  user_model.find({}).
  exec(function (err, data) {
    if (err) {
      next(err);
    } else {
      res.send({ code: 0, data: data });
    }
  });
});

router.get('/:id', function(req, res, next){
  user_model.findOne({ _id: req.params.id }).
  exec( function (err, data) {
    if (err) {
      next(err);
    } else {
      res.send({ code: 0, data: data });
    }
  });
});

router.post('/', function (req, res, next) {
  const user = new user_model(
    req.body
  );
  user.save(function (err, data) {
    if (err) {
      next(err)
    } else {
      res.send({ code: 0, data: data });
    }
  });
});

router.put('/:id', function (req, res, next) {
  user_model.findById(req.params.id, function(err, user) {
    if (err){
      next(err);
    }
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err) {
      if (err){
        next(err);
      }
      res.send({ code: 0, data: user });
    });
  });
});

router.delete('/:id', function (req, res, next) {
  user_model.remove({
    _id: req.params.id
  }, function(err, bear) {
    if (err){
      next(err);
    }
    res.json({code: 0, message: 'Successfully deleted' });
  });
});

module.exports = router;
