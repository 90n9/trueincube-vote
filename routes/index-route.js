var express = require('express');
var index = require('../controllers/index-controller');
var router = express.Router();

/* GET home page. */
router.get('/', index.render);

module.exports = router;