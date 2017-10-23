var express = require('express');
var auth = require("../auth")();
var userController = require('../controllers/user-controller');

var router = express.Router();


router.get('/', userController.getList);
router.get('/:username', userController.getData);
router.post('/', userController.insert);
router.put('/:username', userController.update);
router.delete('/:username', userController.delete);

module.exports = router;
