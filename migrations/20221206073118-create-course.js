"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Courses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      thumbnail: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      type: {
        type: Sequelize.ENUM,
        values: ["free", "premium"],
        allowNull: false,
        defaultValue: "free",
      },
      status: {
        type: Sequelize.ENUM,
        values: ["draft", "published"],
        allowNull: false,
        defaultValue: "draft",
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      level: {
        type: Sequelize.ENUM,
        values: ["all-level", "beginner", "intermediate", "advance"],
        allowNull: false,
        defaultValue: "all-level",
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Courses");
  },
};
