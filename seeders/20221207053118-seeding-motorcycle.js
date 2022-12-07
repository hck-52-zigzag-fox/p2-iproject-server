"use strict";

const motorcycles = require("../motorcycles.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    motorcycles.forEach((item) => {
      item.createdAt = new Date();
      item.updatedAt = new Date();

      return item;
    });
    await queryInterface.bulkInsert("Motorcycles", motorcycles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Motorcycles", null, {});
  },
};
