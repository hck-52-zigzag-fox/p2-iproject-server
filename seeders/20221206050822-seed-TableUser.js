"use strict";

const { hashPassword } = require("../helpers/bcrypt");

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
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "arosewell0@hexun.com",
          password: hashPassword("qwerty"),
          address: "3 Sutteridge Place",
        },
        {
          email: "lmatusov1@yale.edu",
          password: hashPassword("qwerty"),
          address: "9569 Mallard Plaza",
        },
        {
          email: "grichold2@npr.org",
          password: hashPassword("qwerty"),
          address: "4190 Clyde Gallagher Center",
        },
        {
          email: "ashrigley3@lulu.com",
          password: hashPassword("qwerty"),
          address: "27 Magdeline Street",
        },
        {
          email: "ealben4@ning.com",
          password: hashPassword("qwerty"),
          address: "1 David Junction",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
