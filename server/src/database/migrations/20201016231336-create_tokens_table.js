module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        type: Sequelize.STRING,
      },
      token: {
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
    return queryInterface.dropTable('Tokens');
  },
};
