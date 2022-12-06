'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Liked extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Liked.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  }
  Liked.init({
    UserId: DataTypes.INTEGER,
    AnimeId: DataTypes.INTEGER,
    reccomended: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Liked',
  });
  return Liked;
};