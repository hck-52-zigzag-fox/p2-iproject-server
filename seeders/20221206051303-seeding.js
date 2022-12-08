'use strict';

const { hassPass } = require('../helpers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Users', require('../db/users.json').map((el)=>{
      el.password = hassPass(el.password)
      el.createdAt = new Date ()
      el.updatedAt = new Date()
      return el
     }), {});
     await queryInterface.bulkInsert('Categories', require('../db/categories.json').map((el)=>{
      el.createdAt = new Date ()
      el.updatedAt = new Date()
      return el
     }), {});
     await queryInterface.bulkInsert('Products', require('../db/product.json').map((el)=>{
      el.createdAt = new Date ()
      el.updatedAt = new Date()
      return el
     }), {});
   
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Products', null, {});
      await queryInterface.bulkDelete('Categories', null, {});
      await queryInterface.bulkDelete('Users', null, {});
  }
};
