var express = require('express');
var router = express.Router();

const paymentsController = require('../controllers/paymentsController');

router.post('/pay', paymentsController.pay);

module.exports = router;
