'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    status: {
      type: DataTypes.ENUM,
      values: ['confirmed', 'declined', 'delivered'],
      required: true,
      allowNull: false,
      validate: {
        isIn: {
          args: [['created', 'confirmed', 'declined', 'delivered', 'canceled']],
          msg: 'Status should be `created`, `confirmed`, `declined` or `delivered` only.'
        }
      }
    },
    sum: {
      type: DataTypes.FLOAT,
      required: true,
      validate: {
        isDecimal: true,
        min: 0
      }
    }
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};
