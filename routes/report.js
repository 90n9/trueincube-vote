var express = require('express');
var router = express.Router();
var userModel = require('../models/transaction-model');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a report');
});


router.post('/',function(req,res,next){

});

module.exports = router;
