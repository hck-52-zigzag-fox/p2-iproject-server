'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let queryProducts = JSON.parse(fs.readFileSync('./data/product.json','utf-8'))

    queryProducts = queryProducts.map(el=>{
      delete el.id 
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Products',queryProducts,{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
