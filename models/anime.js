'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Anime.hasMany(models.Liked)
    }
  }
  Anime.init({
    malId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    malUrl: DataTypes.STRING,
    released: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Anime',
  });
  return Anime;
};