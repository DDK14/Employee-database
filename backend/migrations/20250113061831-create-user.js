'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      proposedRole: { type: Sequelize.STRING },
      name: { allowNull: false, type: Sequelize.STRING },
      location: { type: Sequelize.STRING },
      dateOfJoining: {  allowNull: false,type: Sequelize.DATE },
      employeeCode: { type: Sequelize.STRING, unique: true },
      personalEmail: { type: Sequelize.STRING },
      officialEmail: {  allowNull: false,type: Sequelize.STRING },
      contactNumber: {  allowNull: false,type: Sequelize.STRING },
      emergencyContactNumber: { type: Sequelize.STRING },
      businessUnit: { type: Sequelize.STRING },
      department: { allowNull: false, type: Sequelize.STRING },
      reportingManager: { allowNull: false, type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Employees');
  }
};
