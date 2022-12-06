'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      SenderId: {
        type: Sequelize.INTEGER,
        references : {
          model:"Users",
          key:'id'
        },
        onDelete:'cascade',
        onUpdate:'cascade',
      },
      ReceiverId: {
        type: Sequelize.INTEGER,
        references : {
          model:"Users",
          key:'id'
        },
        onDelete:'cascade',
        onUpdate:'cascade',
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
    await queryInterface.dropTable('Chats');
  }
};