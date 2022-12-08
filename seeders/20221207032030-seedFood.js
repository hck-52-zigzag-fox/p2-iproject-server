'use strict';
const fs = require('fs')
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

     const food = JSON.parse(fs.readFileSync('./datas/food.json')).map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      
      if (el.calories <= 150) {
        el.foodStatus = 'green'
      } else if (el.calories > 150) {
        el.foodStatus = 'red'
      }

      return el
    })

    await queryInterface.bulkInsert("Food", food, {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("Food", null, {})

  }
};
