var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
  res.send('Pet Adoption App Backend!');
});

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
//router.use('/pet', require('./pet'));


module.exports = router;