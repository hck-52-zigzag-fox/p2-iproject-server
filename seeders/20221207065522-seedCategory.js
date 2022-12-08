'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let queryCategories = JSON.parse(fs.readFileSync('./data/category.json','utf-8'))

    queryCategories = queryCategories.map(el=>{
      delete el.id 
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Categories',queryCategories,{})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Categories', null, {});
  }
};
