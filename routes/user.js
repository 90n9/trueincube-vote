var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send([{
    _id:001,
    username:"90n9",
    firstname:"Narathip",
    lastname:"Harijiratiwong",
    email:"tholop@gmail.com",
    password:"xxxxxx",
    create_date:"2017-10-13 20:07",
  }]);
});
router.get('/:id', function(req, res, next){
  res.send({
    _id:001,
    username:"90n9",
    firstname:"Narathip",
    lastname:"Harijiratiwong",
    email:"tholop@gmail.com",
    password:"xxxxxx",
    create_date:"2017-10-13 20:07",
  });
});

module.exports = router;
