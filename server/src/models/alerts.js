module.exports = (sequelize, DataTypes) => {
  const Alert = sequelize.define('Alert', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    sensor: {
      type: DataTypes.STRING,
    },
    opened: {
      type: DataTypes.BOOLEAN,
    },
    carChassis: {
      type: DataTypes.INTEGER,
    },
  });

  Alert.associate = (models) => {
    Alert.belongsTo(models.Car, {
      foreignKey: 'carChassis',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Alert;
};
