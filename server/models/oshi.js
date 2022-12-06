'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oshi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Oshi.init({
    UserId: {
      type: DataTypes.INTEGER,
      unique: {msg: 'Gaboleh oleng bro'}
    },
    MemberId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Oshi',
  });
  return Oshi;
};