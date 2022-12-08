'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rent.init({
    UserId: DataTypes.INTEGER,
    MotorcycleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rent',
  });
  return Rent;
};