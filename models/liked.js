'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Liked extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Liked.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  }
  Liked.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "User Id cannot be empty" },
        notNull: { msg: "User Id cannot be empty" },
      },
    },
    malId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Mal Id cannot be empty" },
        notNull: { msg: "Mal Id cannot be empty" },
      },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title cannot be empty" },
          notNull: { msg: "Title cannot be empty" },
        },
      },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Type cannot be empty" },
          notNull: { msg: "Type cannot be empty" },
        },
      },
    malUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Mal Url cannot be empty" },
          notNull: { msg: "Mal Url cannot be empty" },
        },
      },
    posterUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Poster Url cannot be empty" },
          notNull: { msg: "Poster Url cannot be empty" },
        },
      },
    released: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Released cannot be empty" },
        notNull: { msg: "Released cannot be empty" },
      },
    },
    recommended: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Recommended cannot be empty" },
        notNull: { msg: "Recommended cannot be empty" },
      },
    },
  }, {
    sequelize,
    modelName: 'Liked',
  });
  return Liked;
};