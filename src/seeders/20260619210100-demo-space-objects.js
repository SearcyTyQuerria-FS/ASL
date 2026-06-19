'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('SpaceObjects', [
      {
        name: 'Earth',
        type: 'planet',
        description: 'The planet humans call home.',
        distanceFromEarth: 0,
        diameter: 12742,
        discoveredAt: null,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Sun',
        type: 'star',
        description: 'The star at the center of the Solar System.',
        distanceFromEarth: 149600000,
        diameter: 1392700,
        discoveredAt: null,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Milky Way',
        type: 'galaxy',
        description: 'The galaxy that contains the Solar System.',
        distanceFromEarth: 0,
        diameter: 105700,
        discoveredAt: null,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('SpaceObjects', {
      name: ['Earth', 'Sun', 'Milky Way']
    });
  }
};
