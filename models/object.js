'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Object extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Object.init({
    name: DataTypes.STRING,
    discoveredBy: DataTypes.STRING,
    discoveryDate: DataTypes.DATE,
    imageUrl: DataTypes.STRING,
    customObject: DataTypes.BOOLEAN,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Object',
  });
  return Object;
};