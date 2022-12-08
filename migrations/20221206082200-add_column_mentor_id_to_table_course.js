"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Courses", "MentorId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Mentors",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Courses", "MentorId");
  },
};
