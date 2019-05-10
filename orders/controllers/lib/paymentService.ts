const axios = require('axios');
const models = require('../../../models');
const { PaymentProcessError, OrderUpdateError } = require('../../helpers/errors');

export class PaymentService {
  readonly orderId: number;
  readonly orderSum: number;
  readonly paymentUrl = 'http://payments_api:3000/pay';

  constructor(id: number, sum: number) {
    this.orderId = id;
    this.orderSum = sum || 0;
  }

  pay(token){
    return axios.post( this.paymentUrl, {
      sum: this.orderSum
    },
    {
      headers: {
        'x-access-token': token
      }
    }
    ).then( response => {
      models.Order.update(
        { status: response.data.status },
        {
          where: { id: this.orderId },
          returning: true
        }
      ).then( ([ updatedCount, [updatedOrder] ]) => {
        if (updatedCount > 0){
          setTimeout(() => {
            this.deliverOrCancelOrder(updatedOrder).catch(err => {
              throw err;
            })
          }, 3000);
        }
      }).catch( err => {
        throw new OrderUpdateError(err);
      });
    }).catch( err => {
      throw new PaymentProcessError(err);
    });
  }

  private deliverOrCancelOrder(order){
    let nextOrderStatus = order.status == 'confirmed' ? 'delivered' : 'canceled';
    return models.Order.update(
      { status: nextOrderStatus },
      {
        where: { id: order.id },
        returning: true
      }
    ).then( ([ updatedCount, [updatedOrder] ]) => {
      //can do something more with updated order
    }).catch( err => {
      throw new OrderUpdateError(err);
    });
  }
}
