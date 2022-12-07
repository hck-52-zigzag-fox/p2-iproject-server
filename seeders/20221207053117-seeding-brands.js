"use strict";

const brands = require("../brands.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    brands.forEach((item) => {
      item.createdAt = new Date();
      item.updatedAt = new Date();

      return item;
    });
    await queryInterface.bulkInsert("Brands", brands, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Brands", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
