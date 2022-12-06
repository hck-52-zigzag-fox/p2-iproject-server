"use strict";

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
      "Items",
      [
        {
          name: "Bust Up",
          description: "I will draw u the Bust Up version of your character.",
          price: 50000,
        },
        {
          name: "Knee Up",
          description: "I will draw u the Knee Up version of your character.",
          price: 100000,
        },
        {
          name: "Full Body",
          description: "I will draw u the Full Body version of your character.",
          price: 150000
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
    await queryInterface.bulkDelete("Items", null, {});
  },
};
