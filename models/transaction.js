'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    addressBuyer: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    amount: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    emailUser: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {

    hooks:{
      afterCreate: (user, options) => {
        console.log(user);
        console.log(user.dataValues.itemId);
        let Item = sequelize.models.Item

        Item.findOne({where:{
          id:user.dataValues.itemId
        }},{raw:true})
        .then(dataItem => {
          Item.update({
            amount:dataItem.dataValues.amount - user.dataValues.amount
          },{
            where:{
              id:user.dataValues.itemId
            }
          })
        })
      }
    }

  });
  Transaction.associate = function(models) {
    let User = models.User
    let Item = models.Item

    Transaction.belongsTo(Item,{foreignKey:'itemId'})
    Transaction.belongsTo(User, {foreignKey:'emailUser'})
  };
  return Transaction;
};