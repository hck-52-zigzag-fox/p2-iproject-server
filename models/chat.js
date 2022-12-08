"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
    }
  }
  Chat.init(
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Text chat can't be empty" },
          notNull: { msg: "Text chat can't be empty" },
        },
      },
      SenderId: DataTypes.INTEGER,
      ReceiverId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Chat",
    }
  );
  return Chat;
};
