'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EmployeeDrafts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      proposedRole: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING }, 
      location: { type: Sequelize.STRING },
      dateOfJoining: { type: Sequelize.DATE },
      employeeCode: { type: Sequelize.STRING },
      personalEmail: { type: Sequelize.STRING },
      officialEmail: { type: Sequelize.STRING },
      contactNumber: { type: Sequelize.STRING },
      emergencyContactNumber: { type: Sequelize.STRING },
      businessUnit: { type: Sequelize.STRING },
      department: { type: Sequelize.STRING },
      reportingManager: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EmployeeDrafts');
  },
};
