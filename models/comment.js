"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, { foreignKey: "UserId" });
      Comment.belongsTo(models.Post, { foreignKey: "postId" });
    }
  }
  Comment.init(
    {
      content: DataTypes.STRING,
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
