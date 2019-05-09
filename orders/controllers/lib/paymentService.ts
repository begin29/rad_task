const axios = require('axios');
const models = require('../models');

export class PaymentService {
  readonly orderId: number;
  readonly orderSum: number;
  readonly paymentUrl = 'http://payments_api:3000/pay';

  constructor(id: number, sum: number) {
    this.orderId = id;
    this.orderSum = sum || 0;
  }

  pay(token){
    axios.post( this.paymentUrl, {
      //expect to do something with sum within payment service
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
        setTimeout(() => this.deliverOrCancelOrder(updatedOrder), 3000);
      }).catch( err => {
        console.log(err.message);
      });
    }).catch( err => {
      console.log(err.message);
    });
  }

  private deliverOrCancelOrder(order){
    let nextOrderStatus = order.status == 'confirmed' ? 'delivered' : 'canceled';
    models.Order.update(
      { status: nextOrderStatus },
      {
        where: { id: order.id },
        returning: true
      }
    ).then( ([ updatedCount, [updatedOrder] ]) => {
      //can do something more with updated order
    }).catch( err => {
      console.log(err.message)
    });
  }
}
