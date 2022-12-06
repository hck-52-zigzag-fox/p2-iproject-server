"use strict";
const { Model } = require("sequelize");
const { encrypt } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Liked);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Username cannot be empty" },
          notNull: { msg: "Username cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email already used" },
        validate: {
          notEmpty: { msg: "Email cannot be empty" },
          notNull: { msg: "Email cannot be empty" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8],
            msg: "password must have minimum 8 characters",
          },
          notEmpty: { msg: "password cannot be empty" },
          notNull: { msg: "password cannot be empty" },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Status cannot be empty" },
          notNull: { msg: "Status cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user, options) => {
    user.status = 'Free'
    user.password = encrypt(user.password);
  });
  return User;
};
