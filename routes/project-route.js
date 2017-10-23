var express = require('express');
var auth = require("../auth")();
var projectController = require('../controllers/project-controller');

var router = express.Router();
router.get('/', projectController.getList);
router.get('/my', auth.authenticate(), projectController.getMyProject);
router.get('/user/:user_id', projectController.getUserList);
router.get('/:project_id', projectController.getData);
router.post('/', auth.authenticate(), projectController.insert);
router.put('/:project_id', auth.authenticate(), projectController.update);
router.delete('/:project_id', auth.authenticate(), projectController.delete);
module.exports = router;