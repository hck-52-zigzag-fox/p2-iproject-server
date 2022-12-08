"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chapter.hasMany(models.Lesson);
      Chapter.belongsTo(models.Course);
    }
  }
  Chapter.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "chapter name is required",
          notEmpty: "chapter name is required",
        },
      },
      CourseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "course id is required",
          notEmpty: "course id is required",
        },
      },
    },
    {
      sequelize,
      modelName: "Chapter",
    }
  );
  return Chapter;
};
