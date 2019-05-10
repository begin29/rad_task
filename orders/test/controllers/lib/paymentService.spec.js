var axios = require("axios");
var models = require("../../../models");
const chai = require('chai');
var expect = chai.expect;
var paymentService = require("../../../build/controllers/lib/paymentService")["PaymentService"];

describe('ordersController', function() {
  after(async () => {
    await models.Order.destroy({
            where: {},
            truncate: true
          });
	});

  it('returns authorize error', async function() {
    var paymentServiceInstance = new paymentService('1', '10')

    try{
      var res = await paymentServiceInstance.pay('')
    } catch(err){
      expect(err.name).to.equal('PaymentProcessError');
    }
  });

  it('updates order status based on payment response', function(done) {
    this.timeout(15000);

    models.Order.create({status: 'created', sum: 10}
    ).then(order => {
      new paymentService(order.id, order.sum).pay('foo-token');
      setTimeout( () => {

        models.Order.findAll({
          where: { id: order.id }
        }).then( ( [updatedOrder] ) => {
          setTimeout( () => {
            models.Order.findAll({
              where: { id: order.id }
            }).then( ( [afterPaymentOrder] ) => {
              if (updatedOrder.status == 'confirmed'){
                expect(afterPaymentOrder.status).to.eq('delivered');
              } else {
                expect(afterPaymentOrder.status).to.eq('canceled');
              }
              done();
            });
          }, 3000)
        }).catch(err => {
          done(err);
        });
      }, 1000);

    }).catch(err => {
      done(err);
    });
  });
});
