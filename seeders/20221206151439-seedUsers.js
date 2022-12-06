'use strict';

const { hash } = require('../helpers/bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let password = "12345"
    let users = [
      {email:"ian@mail.com", password:hash(password)},
      {email:"user@mail.com", password:hash(password)},
      {email:"guest@mail.com", password:hash(password)},
    ]
     await queryInterface.bulkInsert('Users',users, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
