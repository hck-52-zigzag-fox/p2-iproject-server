'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Motorcycle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Motorcycle.init({
    type: DataTypes.STRING,
    cc: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    BrandId: DataTypes.INTEGER,
    facility: DataTypes.STRING,
    status: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Motorcycle',
  });
  return Motorcycle;
};