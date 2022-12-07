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
      Profile.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Profile.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      profilePict: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "profilePict is required",
          },
          notEmpty: {
            msg: "profilePict is required",
          },
        },
      },
      about: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "about is required",
          },
          notEmpty: {
            msg: "about is required",
          },
        },
      },
      job: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "job is required",
          },
          notEmpty: {
            msg: "job is required",
          },
        },
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "company is required",
          },
          notEmpty: {
            msg: "company is required",
          },
        },
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "dateOfBirth is required",
          },
          notEmpty: {
            msg: "dateOfBirth is required",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "gender is required",
          },
          notEmpty: {
            msg: "gender is required",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
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
