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
          imageUrl:
            "https://trello.com/1/cards/6310afa34687f0003096cfe5/attachments/631e10849ae2df00a130436d/previews/631e10859ae2df00a1304377/download/Untitled101_20220911231925-01.jpeg",
        },
        {
          name: "Knee Up",
          description: "I will draw u the Knee Up version of your character.",
          price: 100000,
          imageUrl:
            "https://trello.com/1/cards/61df975c0dd2c061d2e8ff34/attachments/623012b5f46e354963dad71c/previews/623012b6f46e354963dad74a/download/SAVE_20220315_111430.jpg",
        },
        {
          name: "Full Body",
          description: "I will draw u the Full Body version of your character.",
          price: 150000,
          imageUrl:
            "https://trello.com/1/cards/62f5f974a3ec4a6084c1808c/attachments/6319ba02985519010970f22d/previews/6319ba03985519010970f236/download/SAVE_20220908_163913-02.jpeg",
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
