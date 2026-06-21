'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('StarsPlanets', {
      fields: ['starId'],
      type: 'foreign key',
      name: 'fk_starsPlanets_starId',
      references: {
        table: 'Stars',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('StarsPlanets', {
      fields: ['planetId'],
      type: 'foreign key',
      name: 'fk_starsPlanets_planetId',
      references: {
        table: 'Planets',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('StarsPlanets', 'fk_starsPlanets_planetId');
    await queryInterface.removeConstraint('StarsPlanets', 'fk_starsPlanets_starId');
  }
};
