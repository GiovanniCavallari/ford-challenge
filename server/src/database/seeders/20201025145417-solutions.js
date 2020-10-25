module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Solutions',
      [
        {
          sensor: 'temperature',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque molestie metus.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'temperature',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque molestie metus.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Solutions', null, {});
  },
};
