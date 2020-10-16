module.exports = (sequelize, DataTypes) => {
  const Alert = sequelize.define('Alert', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
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
