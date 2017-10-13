var express = require('express');
var router = express.Router();
var user_model = require('../models/user');

/* GET users listing. */
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
  var user = new user_model(
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

module.exports = router;
