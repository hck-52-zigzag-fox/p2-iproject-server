"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProfileGirlfriends", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      benefits: {
        type: Sequelize.STRING,
      },
      like: {
        type: Sequelize.STRING,
      },
      dislike: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      price:{
        type:Sequelize.INTEGER
      },
      booked: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:new Date()
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model : 'Users',
          key:'id'
        },
        onDelete:'cascade',
        onUpdate:'cascade',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProfileGirlfriends");
  },
};
