'use strict';
const fs = require('fs')
const { hashedPassword } = require("../helpers/bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let query = JSON.parse(fs.readFileSync('./data/customer.json','utf-8'))

    query = query.map(el=>{
      delete el.id 
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = hashedPassword(el.password)
      return el
    })

    await queryInterface.bulkInsert('Customers',query,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Customers',null,{})
  }
};
