'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('popularFoods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sugarG: {
        type: Sequelize.FLOAT
      },
      fiberG: {
        type: Sequelize.FLOAT
      },
      sodiumMg: {
        type: Sequelize.FLOAT
      },
      potassiumMg: {
        type: Sequelize.FLOAT
      },
      saturatedFatG: {
        type: Sequelize.FLOAT
      },
      totalFatG: {
        type: Sequelize.FLOAT
      },
      calories: {
        type: Sequelize.FLOAT
      },
      cholesterolMg: {
        type: Sequelize.FLOAT
      },
      proteinG: {
        type: Sequelize.FLOAT
      },
      carbsTotalG: {
        type: Sequelize.FLOAT
      },
      foodStatus: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('popularFoods');
  }
};