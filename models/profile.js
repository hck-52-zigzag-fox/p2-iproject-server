"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  Profile.init(
    {
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Image url is required",
          },
          notNull: {
            msg: "Image url is required",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Gender is required",
          },
          notNull: {
            msg: "Gender is required",
          },
        },
      },
      dateOfBirth: {
        type: DataTypes.DATE,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Location is required",
          },
          notNull: {
            msg: "Location is required",
          },
        },
      },
      games: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Games is required",
          },
          notNull: {
            msg: "Games is required",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        unique: {
          msg: "User only can have 1 profile",
        },
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
