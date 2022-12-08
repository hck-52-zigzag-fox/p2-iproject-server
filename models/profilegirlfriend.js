"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProfileGirlfriend extends Model {
    static associate(models) {
      ProfileGirlfriend.belongsTo(models.User);
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
          notEmpty: { msg: "Image profile required" },
        },
      },
      benefits: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Describe your benefits as girlfriend" },
          notEmpty: { msg: "Describe your benefits as girlfriend" },
        },
      },
      like: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Mention your likes" },
          notEmpty: { msg: "Mention your likes" },
        },
      },
      dislike: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Mention your dislike" },
          notEmpty: { msg: "Mention your dislike" },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      price : {
        type:DataTypes.INTEGER,
        allowNull:false,
        validate : {
          notNull:{msg:'Pick your own price'},
          notEmpty:{msg:'Pick your own price'},
          min : {
            args:150000,
            msg:"Price cant be under Rp 150.000"
          },
          max : {
            args:500000,
            msg:"Price cant be higher than Rp 500.000"
          }
        },
      },
      booked: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
      UserId:{
        type:DataTypes.INTEGER,
        allowNull:false
      }
    },
    {
      sequelize,
      modelName: "ProfileGirlfriend",
    }
  );
  return ProfileGirlfriend;
};
