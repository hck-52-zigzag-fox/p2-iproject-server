'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class popularFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  popularFood.init({
    name: DataTypes.STRING,
    sugarG: DataTypes.FLOAT,
    fiberG: DataTypes.FLOAT,
    sodiumMg: DataTypes.FLOAT,
    potassiumMg: DataTypes.FLOAT,
    saturatedFatG: DataTypes.FLOAT,
    totalFatG: DataTypes.FLOAT,
    calories: DataTypes.FLOAT,
    cholesterolMg: DataTypes.FLOAT,
    proteinG: DataTypes.FLOAT,
    carbsTotalG: DataTypes.FLOAT,
    foodStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'popularFood',
  });

  popularFood.beforeCreate((popularFood) => {

    if (popularFood.calories <= 100) {
      popularFood.foodStatus = 'green'
    } else if (popularFood.calories > 150) {
      popularFood.foodStatus = 'red'
    }
    
  })

  return popularFood;
};