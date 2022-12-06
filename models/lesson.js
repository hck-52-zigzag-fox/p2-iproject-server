"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lesson.belongsTo(models.Chapter);
    }
  }
  Lesson.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "lesson name is required",
          notEmpty: "lesson name is required",
        },
      },
      video: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: "video lesson is required",
          notEmpty: "video lesson is required",
        },
      },
      ChapterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "chapter id is required",
          notEmpty: "chapter id is required",
        },
      },
    },
    {
      sequelize,
      modelName: "Lesson",
    }
  );
  return Lesson;
};
