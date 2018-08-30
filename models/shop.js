'use strict';
module.exports = (sequelize, DataTypes) => {
  var Shop = sequelize.define('Shop', {
    name: DataTypes.STRING,
    emailUser: DataTypes.INTEGER
  }, {});
  Shop.associate = function(models) {
    let User = models.User
    let Item = models.Item

    Shop.belongsTo(User,{foreignKey:'emailUser'})
    Shop.hasMany(Item,{foreignKey:'shopId'})
  };
  return Shop;
};