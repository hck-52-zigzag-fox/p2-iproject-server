'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class foodLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      foodLog.belongsTo(models.Food)
      foodLog.belongsTo(models.User)
    }
  }
  foodLog.init({
    UserId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'foodLog',
  });
  return foodLog;
};