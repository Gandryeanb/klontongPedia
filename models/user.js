'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
      validate : {
        is: {
          args : ["^[a-z]+$",'i'],
          msg : 'last name must be a char!'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate : {
        isAlphanumeric: {
          msg : 'username only allow alphanumeric characters!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        isAlphanumeric: {
          msg : 'username only allow alphanumeric characters!'
        }
      }
    },
    gender: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      validate : {
        not: {
          args: ["[a-z]",'i'],
          msg : 'phone must a number'
        }
      }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};

// 