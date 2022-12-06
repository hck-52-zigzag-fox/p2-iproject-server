"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProfileGirlfriend extends Model {
    static associate(models) {
      ProfileGirlfriend.belongsTo(models.Users);
      ProfileGirlfriend.hasMany(models.CustomerOrder)
    }
  }
  ProfileGirlfriend.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please pick your name" },
          notEmpty: { msg: "Please pick your name" },
        },
        unique : {
          msg:'Name already been used'
        }
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Image profile required" },
          notNull: { msg: "Image profile required" },
        },
      },
      benefits: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Describe your benefits as girlfriend" },
          notNull: { msg: "Describe your benefits as girlfriend" },
        },
      },
      like: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Mention your likes" },
          notNull: { msg: "Mention your likes" },
        },
      },
      dislike: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Mention your dislike" },
          notNull: { msg: "Mention your dislike" },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      booked: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      }
    },
    {
      sequelize,
      modelName: "ProfileGirlfriend",
    }
  );
  return ProfileGirlfriend;
};
