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
    let User = models.User
    let Item = models.Item

    Transaction.belongsTo(Item,{foreignKey:'itemId'})
    Transaction.belongsTo(User, {foreignKey:'emailUser'})
  };
  return Transaction;
};