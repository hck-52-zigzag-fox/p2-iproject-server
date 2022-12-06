'use strict';

const { hashPass } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',[
      {
        email:'ipul@gmail.com',
        password:hashPass('ipul123'),
        role:"customer"
      },
      {
        email :'pacar1@gmail.com',
        password :hashPass('pacar1@123'),
        role:'girlfriend'
      },
      {
        email:'pacar2@gmail.com',
        password:hashPass('pacar2@123'),
        role:'girlfriend'
      }
    ],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users',null,{})
  }
};
