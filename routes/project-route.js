var express = require('express');
var router = express.Router();
var projectModel = require('../models/project-model');
var projectController = require('../controllers/project-controller');

router.get('/', projectController.getList);
router.get('/my', projectController.getMyProject);
router.get('/user/:user_id', projectController.getUserList);
router.get('/:project_id', projectController.getData);
router.post('/', projectController.insert);
router.put('/:project_id', projectController.update);
router.delete('/:project_id', projectController.delete);
module.exports = router;