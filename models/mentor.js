"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mentor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mentor.hasMany(models.Course);
    }
  }
  Mentor.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "mentor name is required" },
          notEmpty: { msg: "mentor name is required" },
        },
      },
      profile: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "mentor profile is required" },
          notEmpty: { msg: "mentor profile is required" },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: { msg: "mentor email already registered" },
        validate: {
          notNull: { msg: "mentor email is required" },
          notEmpty: { msg: "mentor email is required" },
          isEmail: { msg: "mentor email is not valid" },
        },
      },
      profession: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "mentor profession is required" },
          notEmpty: { msg: "mentor profession is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Mentor",
    }
  );
  return Mentor;
};
