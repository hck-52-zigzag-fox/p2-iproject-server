"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CustomerOrder extends Model {
    static associate(models) {
      CustomerOrder.belongsToMany(models.User);
    }
  }
  CustomerOrder.init(
    {
      orderType: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      ProfileGirlfriendId: DataTypes.INTEGER,
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Pick your date time" },
          notNull: { msg: "Pick your date time" },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Pick your end date time" },
          notNull: { msg: "Pick your end date time" },
        },
      },
    },
    {
      sequelize,
      modelName: "CustomerOrder",
      hooks: {
        beforeCreate(customerOrder) {
          if (customerOrder.orderType == "online") {
            customerOrder.endDate = customerOrder.endDate.setTime(
              customerOrder.endDate.getTime() + 1 * 60 * 60 * 1000
            );
          }
        },
      },
    }
  );
  return CustomerOrder;
};
