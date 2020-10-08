module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Cars',
      [
        {
          chassis: 123456,
          name: 'Ranger',
          model: 'Ranger 2020',
          licensePlate: 'FRD-2020',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Cars', null, {});
  },
};
