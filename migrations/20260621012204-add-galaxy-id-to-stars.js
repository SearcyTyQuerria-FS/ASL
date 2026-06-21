'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Stars', 'galaxyId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Galaxies',
        key: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Stars', 'galaxyId');
  }
};
