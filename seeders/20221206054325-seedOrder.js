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
      "Orders",
      [
        {
          UserId: 1,
          ItemId: 2,
          status: "Unpaid",
        },
        {
          UserId: 3,
          ItemId: 2,
          status: "Paid",
        },
        {
          UserId: 1,
          ItemId: 2,
          additionalPrice: 200000,
          additionalDetail: "Add 2 characters with background",
          status: "Unpaid",
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
     await queryInterface.bulkDelete('Orders', null, {});
  },
};
