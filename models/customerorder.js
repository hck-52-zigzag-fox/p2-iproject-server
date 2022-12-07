"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CustomerOrder extends Model {
    static associate(models) {
      CustomerOrder.belongsTo(models.User);
      CustomerOrder.belongsTo(models.ProfileGirlfriend);
    }
  }
  CustomerOrder.init(
    {
      orderType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Pick your order type",
            notEmpty: { msg: "Pick your order type" },
          },
        },
      },
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
        defaultValue:new Date()
      },
    },
    {
      sequelize,
      modelName: "CustomerOrder",
      hooks: {
        beforeCreate(customerOrder) {
          console.log(customerOrder.orderType,'dari hooks');
          if (customerOrder.orderType !== "online") {
            customerOrder.endDate = new Date(customerOrder.endDate.setTime(
              customerOrder.endDate.getTime() + 0.25 * 60 * 60 * 1000
            ));
          }
          console.log(customerOrder.endDate,'ini dari hooks')
        },
      },
    }
  );
  return CustomerOrder;
};
