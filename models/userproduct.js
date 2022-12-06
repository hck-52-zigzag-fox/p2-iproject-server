"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProduct.belongsTo(models.Product)
    }
  }
  UserProduct.init(
    {
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `ProductId is required`,
          },
          notNull: {
            msg: `ProductId is required`,
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `UserId is required`,
          },
          notNull: {
            msg: `UserId is required`,
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Status is Required`,
          },
          notNull: {
            msg: `Status is Required`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "UserProduct",
    }
  );
  return UserProduct;
};
