'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    UsersId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "User Id is required"},
        notEmpty: {msg: "User Id is required"}
      }
    },
    gameID: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Game Id is required"},
        notEmpty: {msg: "Game Id is required"}
      }
    },
    steamAppID: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Steam App Id is required"},
        notEmpty: {msg: "Steam App Id is required"}
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};