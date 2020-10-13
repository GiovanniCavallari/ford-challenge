module.exports = (sequelize, DataTypes) => {
  const Configuration = sequelize.define('Configuration', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    value: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING,
    },
    unit: {
      type: DataTypes.STRING,
    },
    direction: {
      type: DataTypes.STRING,
    },
    carChassis: {
      type: DataTypes.INTEGER,
    },
  });

  Configuration.associate = (models) => {
    Configuration.belongsTo(models.Car, {
      foreignKey: 'carChassis',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Configuration;
};
