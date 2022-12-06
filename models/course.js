"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.hasMany(models.MyCourse);
    }
  }
  Course.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "name course is required" },
          notEmpty: { msg: "name course is required" },
        },
      },
      thumbnail: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "thumbnail course is required" },
          notEmpty: { msg: "thumbnail course is required" },
        },
      },
      type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["free", "premium"],
        defaultValue: "free",
        validate: {
          notNull: { msg: "type course is required" },
          notEmpty: { msg: "type course is required" },
        },
      },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["draft", "published"],
        defaultValue: "draft",
        validate: {
          notNull: { msg: "status course is required" },
          notEmpty: { msg: "status course is required" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: { args: [50000], msg: "price course minimal Rp 50000" },
          notNull: { msg: "price course is required" },
          notEmpty: { msg: "price course is required" },
        },
      },
      level: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["all-level", "beginner", "intermediate", "advance"],
        defaultValue: "all-level",
        validate: {
          notNull: { msg: "level course is required" },
          notEmpty: { msg: "level course is required" },
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notNull: { msg: "description course is required" },
          notEmpty: { msg: "description course is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
