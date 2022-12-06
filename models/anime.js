"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Anime.hasMany(models.Liked);
    }
  }
  Anime.init(
    {
      malId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Mal id be empty" },
          notNull: { msg: "Mal id be empty" },
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
          notEmpty: { msg: "Mal url cannot be empty" },
          notNull: { msg: "Mal url cannot be empty" },
        },
      },
      released: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Released date cannot be empty" },
          notNull: { msg: "Released date cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Anime",
    }
  );
  return Anime;
};
