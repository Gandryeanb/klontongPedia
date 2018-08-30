'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    addressBuyer: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    amount: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    emailUser: DataTypes.STRING
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};