"use strict";
const posts = require("./posts.json");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    posts.forEach((post) => {
      post.createdAt = new Date();
      post.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Posts", posts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
