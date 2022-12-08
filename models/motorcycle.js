"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Motorcycle extends Model {
    static associate(models) {
      Motorcycle.belongsTo(models.Brand);
    }
  }
  Motorcycle.init(
    {
      type: DataTypes.STRING,
      cc: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      BrandId: DataTypes.INTEGER,
      facility: DataTypes.STRING,
      status: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Motorcycle",
    }
  );
  return Motorcycle;
};
