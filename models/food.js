'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.hasMany(models.foodLog)
    }
  }
  Food.init({
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
    modelName: 'Food',
  });

  Food.beforeCreate((food) => {

    if (food.calories <= 150) {
      food.foodStatus = 'green'
    } else if (food.calories > 150) {
      food.foodStatus = 'red'
    }
    
  })


  return Food;
};