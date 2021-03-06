module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Configurations',
      [
        {
          name: 'temperature',
          active: true,
          value: 100,
          type: 'numeric',
          message: 'Revisar',
          unit: '°C',
          direction: 'increasing',
          min: 0,
          max: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
        {
          name: 'fuel',
          active: true,
          value: 5,
          type: 'numeric',
          message: 'Abastecer',
          unit: '%',
          direction: 'decreasing',
          min: 0,
          max: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
        {
          name: 'odometer',
          active: true,
          value: 110000,
          type: 'numeric',
          message: 'Revisar',
          unit: 'km',
          direction: 'increasing',
          min: 0,
          max: 150000,
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
        {
          name: 'oil',
          active: true,
          value: false,
          type: 'boolean',
          message: 'Revisar',
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
        {
          name: 'brake',
          active: true,
          value: true,
          type: 'boolean',
          message: 'Revisar',
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
        {
          name: 'rfTirePressure',
          active: true,
          value: 28,
          type: 'numeric',
          message: 'Calibrar',
          unit: 'psi',
          direction: 'decreasing',
          min: 0,
          max: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
        {
          name: 'lfTirePressure',
          active: true,
          value: 28,
          type: 'numeric',
          message: 'Calibrar',
          unit: 'psi',
          direction: 'decreasing',
          min: 0,
          max: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
        {
          name: 'rrTirePressure',
          active: true,
          value: 28,
          type: 'numeric',
          message: 'Calibrar',
          unit: 'psi',
          direction: 'decreasing',
          min: 0,
          max: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
        {
          name: 'rlTirePressure',
          active: true,
          value: 28,
          type: 'numeric',
          message: 'Calibrar',
          unit: 'psi',
          direction: 'decreasing',
          min: 0,
          max: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
        {
          name: 'rfTireTemp',
          active: true,
          value: 90,
          type: 'numeric',
          message: 'Revisar',
          unit: '°C',
          direction: 'increasing',
          min: 0,
          max: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
        {
          name: 'lfTireTemp',
          active: true,
          value: 90,
          type: 'numeric',
          message: 'Revisar',
          unit: '°C',
          direction: 'increasing',
          min: 0,
          max: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
        {
          name: 'rrTireTemp',
          active: true,
          value: 90,
          type: 'numeric',
          message: 'Revisar',
          unit: '°C',
          direction: 'increasing',
          min: 0,
          max: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
        {
          name: 'rlTireTemp',
          active: true,
          value: 90,
          type: 'numeric',
          message: 'Revisar',
          unit: '°C',
          direction: 'increasing',
          min: 0,
          max: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
          carChassis: 123456,
        },
      ],
      {},
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Configurations', null, {});
  },
};
