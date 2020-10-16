module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Alerts',
      [
        {
          type: 'temperature',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque molestie metus.',
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
        {
          type: 'odometer',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque molestie metus.',
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
      ],
      {},
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Alerts', null, {});
  },
};
