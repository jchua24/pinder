var express = require('express');
var router = express.Router();

router.use('/api/auth', require('./auth'));
router.use('/api/user', require('./user'));
router.use('/api/admin', require('./admin'));


module.exports = router;