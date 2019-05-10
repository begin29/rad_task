var models = require('../models');
var paymentService = require("../build/controllers/lib/paymentService")["PaymentService"];

exports.index = function(req, res) {
  models.Order.findAll({
  }).then(function(orders){
    res.json( orders );
  });
};

exports.create = function(req, res) {
  if (!req.param('items')){
    return res.json( {status: false, error: 'Can`t provide payment for 0 items'} )
  }

  const negativePriceError = negativePriceChecker(req.param('items'));
  if (negativePriceError){ return res.json({status: false, error: negativePriceError }); }

  const itemsSum = sumFromItems( req.param('items') );
  if (itemsSum == undefined || itemsSum == 0 ){
    return res.json({status: false, error: 'Order`s price should be positive value'})
  };

  models.Order.create({
    status: 'created',
    sum: itemsSum
  }).then( order => {
    res.json(order);
    new paymentService(order.id, order.sum).pay(req.header('x-access-token'))
  }).catch(err => {
    console.log(err.message);
    res.status(500).json({error: err.message});
  })
};

function sumFromItems(items){
  return items.reduce((sum, it) => {
    return sum + parseFloat(it.price);
  }, 0);
}

function negativePriceChecker(items){
  const itemsWithNegPrice = items.filter(function(el){
    return parseFloat(el.price) < 0;
  });
  if (itemsWithNegPrice.length > 0 ){
    return 'Item`s price can not be negative';
  }
}
