"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MyCourse.belongsTo(models.User);
      MyCourse.belongsTo(models.Course);
    }
  }
  MyCourse.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "user id is required",
          notEmpty: "user id is required",
        },
      },
      CourseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "user id is required",
          notEmpty: "user id is required",
        },
      },
    },
    {
      sequelize,
      modelName: "MyCourse",
    }
  );
  return MyCourse;
};
