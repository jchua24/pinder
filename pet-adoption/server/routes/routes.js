var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
  res.send('Pet Adoption App Backend!');
});

//router.use('/user', require('./user'));
//router.use('/restaurant', require('./restaurant'));
//router.use('/auth', require('./auth'));

module.exports = router;