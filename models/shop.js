'use strict';
module.exports = (sequelize, DataTypes) => {
  var Shop = sequelize.define('Shop', {
    name: DataTypes.STRING,
    emailUser: DataTypes.INTEGER
  }, {});
  Shop.associate = function(models) {
    // associations can be defined here
  };
  return Shop;
};