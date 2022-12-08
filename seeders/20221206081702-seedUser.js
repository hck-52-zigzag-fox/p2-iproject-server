'use strict';
const fs = require('fs')
const { createHash } = require('../helpers/bcrypt')
const calculator = require('../helpers/calculator')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const users = JSON.parse(fs.readFileSync('./datas/users.json')).map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = createHash(el.password)
      el.dailyCalories = Math.floor(calculator(el.gender, el.age, el.weight, el.height, el.weeklyPhysicalActivity))

      return el
    })

    await queryInterface.bulkInsert("Users", users, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {})
  }
};
