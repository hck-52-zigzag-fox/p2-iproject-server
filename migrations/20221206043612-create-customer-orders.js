'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CustomerOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderType: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        references : {
          model:'Users',
          key:'id'
        },
        onDelete:'cascade',
        onUpdate:'cascade',
      },
      ProfileGirlfriendId: {
        type: Sequelize.INTEGER,
        references : {
          model:'Users',
          key:'id'
        },
        onDelete:'cascade',
        onUpdate:'cascade',
      },
      startDate: {
        type: Sequelize.DATE,
        defaultValue : new Date()
      },
      endDate: {
        type: Sequelize.DATE
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CustomerOrders');
  }
};