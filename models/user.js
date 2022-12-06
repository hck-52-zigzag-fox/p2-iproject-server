"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "Email already used",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Email format is invalid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [6],
            msg: "Password must be at least 6 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user, options) => {
    console.log("beforeCreate", user.password);
    user.password = hashPassword(user.password);
    console.log("afterCreate", user.password);
  });
  return User;
};
