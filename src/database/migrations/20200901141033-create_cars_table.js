module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cars', {
      chassis: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      model: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      licensePlate: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('Cars');
  },
};
