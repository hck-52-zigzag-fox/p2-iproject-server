"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Profiles", [
      {
        name: "Fian Febry Ispianto",
        profilePict:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80",
        about: "I am a web developer",
        company: "Hacktiv8",
        gender: "Male",
        job: "Web Developer",
        dateOfBirth: "1997-12-07",
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Adrian Lie",
        profilePict:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        about: "I am a Back End developer",
        company: "Hacktiv8",
        job: "Back End Developer",
        gender: "Male",
        dateOfBirth: "2000-12-07",
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Agus Ali Hakim",
        profilePict:
          "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80",
        about: "I am a Front End developer",
        company: "Hacktiv8",
        job: "Front End Developer",
        gender: "Male",
        dateOfBirth: "1999-12-07",
        UserId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Annisah",
        profilePict:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80",
        gender: "Female",
        about: "I am a Front End developer",
        company: "Hacktiv8",
        job: "Front End Developer",
        dateOfBirth: "1999-12-07",
        UserId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
