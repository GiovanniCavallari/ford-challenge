module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sensors', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      fuel: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      odometer: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      oil: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      brake: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      temperature: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      rfTirePressure: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      lfTirePressure: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      rrTirePressure: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      rlTirePressure: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      rfTireTemp: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      lfTireTemp: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      rrTireTemp: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      rlTireTemp: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      carChassis: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Cars',
          key: 'chassis',
          as: 'carChassis',
        },
      },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('Sensors');
  },
};
