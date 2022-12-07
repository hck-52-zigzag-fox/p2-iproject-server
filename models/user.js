'use strict';
const { hashPassword } = require('../helpers/index')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: { message: "Email already taken" },
      validate: {
        notNull: { message: "Email is required" },
        notEmpty: { message: "Email is required" },
        isEmail: { message: "Must be Email Format" }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: { message: "Password is required" },
        notEmpty: { message: "Password is required" }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notNull: { message: "Status is required" },
        notEmpty: { message: "Status is required" }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user => {
    user.password = hashPassword(user.password)
  })
  return User;
};