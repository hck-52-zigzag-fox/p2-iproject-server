'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: "Products",
          key: 'id'
        }
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: "Users",
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserProducts');
  }
};