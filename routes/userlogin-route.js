var express = require('express');
var userController = require('../controllers/user-controller');

var router = express.Router();
router.post('/', userController.login);

module.exports = router;
