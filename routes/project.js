var express = require('express');
var router = express.Router();
var project_model = require('../models/project');

router.get('/', function(req, res, next) {
  project_model.find({}).
  populate('user').
  exec(function (err, data) {
    if (err) {
      next(err);
    } else {
      res.send({ code: 0, data: data });
    }
  });
});

router.get('/user/:user_id', function(req, res, next) {
  project_model.find({ user: req.params.user_id }).
  populate('user').
  exec( function (err, data) {
    if (err) {
      next(err);
    } else {
      res.send({ code: 0, data: data });
    }
  });
});

router.get('/:project_id', function(req, res, next) {
  project_model.findOne({ _id: req.params.project_id }).
  populate('user').
  exec( function (err, data) {
    if (err) {
      next(err);
    } else {
      res.send({ code: 0, data: data });
    }
  });
});

router.post('/', function (req, res, next) {
  const project = new project_model(
    req.body
  );
  project.save(function (err, data) {
    if (err) {
      next(err)
    } else {
      res.send({ code: 0, data: data });
    }
  });
});

router.put('/:id', function (req, res, next) {
  project_model.findById(req.params.id, function(err, project) {
    if (err){
      next(err);
    }
    project.project_name = req.body.project_name;
    project.status = req.body.status;
    project.closed_date = req.body.closed_date;
    project.update_date = Date.now;

    project.save(function(err) {
      if (err){
        next(err);
      }
      res.send({ code: 0, data: project });
    });
  });
});

router.delete('/:id', function (req, res, next) {
  project_model.remove({
    _id: req.params.id
  }, function(err, bear) {
    if (err){
      next(err);
    }
    res.json({code: 0, message: 'Successfully deleted' });
  });
});
module.exports = router;
