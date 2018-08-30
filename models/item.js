'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    imageLink: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    let Transaction = models.Transaction
    let Shop = models.Shop

    Item.belongsTo(Shop,{foreignKey:'shopId'})
    Item.hasOne(Transaction,{foreignKey:'itemId'})
  };
  return Item;
};