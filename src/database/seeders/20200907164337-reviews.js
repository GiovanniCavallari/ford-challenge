module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Reviews',
      [
        {
          date: new Date(),
          type: '5000 km rodados',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque molestie metus.',
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
        {
          date: new Date(),
          type: 'Motor',
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
    return queryInterface.bulkDelete('Reviews', null, {});
  },
};
