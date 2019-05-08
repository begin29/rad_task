var express = require('express');
var router = express.Router();

var ordersController = require('../controllers/ordersController')

router.get('/', ordersController.index);

module.exports = router;
