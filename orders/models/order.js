'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    status: DataTypes.STRING,
    sum: DataTypes.FLOAT
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};