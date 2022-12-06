"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Item);
      Order.belongsTo(models.User);
    }
  }
  Order.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "UserId is required" },
          notEmpty: { msg: "UserId is required" },
        },
      },
      ItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "ItemId is required" },
          notEmpty: { msg: "ItemId is required" },
          isInt: { msg: "ItemId must be an number" },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "status is required" },
          notEmpty: { msg: "status is required" },
          isIn: {
            args: [["Paid", "Unpaid"]],
            msg: "Status must be Paid/Unpaid",
          },
        },
      },
      additionalPrice: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: { msg: "ItemId must be an number" },
          min: {
            args: [0],
            msg: "Price must be more than 0"
          }
        }
      },
      additionalDetail: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
