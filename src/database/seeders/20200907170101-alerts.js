module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Alerts',
      [
        {
          title: 'Temperatura do motor elevada',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque molestie metus.',
          sensor: 'temperature',
          opened: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
        {
          title: 'Quilometragem ultrapassou os 100.000km',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque molestie metus.',
          sensor: 'odometer',
          opened: false,
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
