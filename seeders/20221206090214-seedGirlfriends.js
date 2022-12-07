"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ProfileGirlfriends", [
      {
        name: "Ai Sora ",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9xF4NgXca4UWc7Aj1Z_ZFbFKV6hZEr4Zt_A&usqp=CAU",
        benefits: "Bisa  diajak diskusi serius",
        like: "Makanan manis, cowok perhatian",
        dislike: "Cowok kasar dan mesum, seafood",
        rating: 0,
        booked: false,
        price:150000,
        UserId: 2,
        createdAt: "2022-12-06T08:12:06.964Z",
        updatedAt: "2022-12-06T08:12:06.964Z",
      },
      {
        name: "Angela",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEpo99syfHZmgu7rg1qAh8mt4hWjUAIPNXfA&usqp=CAU",
        benefits: "Bisa  diajak diskusi serius",
        like: "Makanan manis, cowok perhatian,musik",
        dislike: "Cowok kasar, durian",
        rating: 0,
        booked: false,
        price:150000,
        UserId: 3,
        createdAt: "2022-12-06T08:28:36.607Z",
        updatedAt: "2022-12-06T08:28:36.607Z",
      },
    ],{});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProfileGirlfriends',null,{})
  },
};
