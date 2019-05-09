var express = require('express');
var router = express.Router();

const ordersController = require('../controllers/ordersController')

router.get('/', ordersController.index);
router.post('/', ordersController.create);

module.exports = router;
