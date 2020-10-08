module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Sensors',
      [
        {
          id: 1,
          fuel: 80,
          odometer: 84500,
          oil: true,
          brake: false,
          temperature: 85,
          rfTirePressure: 30,
          lfTirePressure: 30,
          rrTirePressure: 32,
          rlTirePressure: 32,
          rfTireTemp: 85,
          lfTireTemp: 85,
          rrTireTemp: 85,
          rlTireTemp: 85,
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
      ],
      {},
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Sensors', null, {});
  },
};
