var projectModel = require('../models/project-model');
var controller = {};
controller.getList = function(req, res, next){
  projectModel.find({}).
  populate('user', {password: 0}).
  exec(function (err, data) {
    if (err) {
      next(err);
    } else {
      res.send({ code: 0, data: data });
    }
  });
}
controller.getData = function(req, res, next){
  projectModel.findOne({ _id: req.params.project_id }).
  populate('user').
  exec( function (err, data) {
    if (err) {
      next(err);
    } else {
      res.send({ code: 0, data: data });
    }
  });
}
controller.getUserList = function(req, res, next){
  projectModel.find({ user: req.params.user_id }).
  populate('user', {password: 0}).
  exec( function (err, data) {
    if (err) {
      next(err);
    } else {
      res.send({ code: 0, data: data });
    }
  });
}
controller.getMyProject = function(req, res, next){
  projectModel.find({user: req.user.user._id})
  .populate('user', {password: 0})
  .exec(function(err, data){
    if (err) {
      next(err);
    } else {
      res.send({ code: 0, data: data });
    }
  });
}
controller.insert = function(req, res, next){
  const project = new projectModel(
    req.body
  );
  project.save(function (err, data) {
    if (err) {
      next(err)
    } else {
      res.send({ code: 0, data: data });
    }
  });
}
controller.update = function(req, res, next){
  projectModel.findById(req.params.id, function(err, project) {
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
}
controller.delete = function(req, res, next){
  projectModel.remove({
    _id: req.params.id
  }, function(err, bear) {
    if (err){
      next(err);
    }
    res.json({code: 0, message: 'Successfully deleted' });
  });
}
module.exports = controller;