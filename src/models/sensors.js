module.exports = (sequelize, DataTypes) => {
  const Sensor = sequelize.define('Sensor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    fuel: {
      type: DataTypes.INTEGER,
    },
    odometer: {
      type: DataTypes.INTEGER,
    },
    oil: {
      type: DataTypes.BOOLEAN,
    },
    brake: {
      type: DataTypes.BOOLEAN,
    },
    temperature: {
      type: DataTypes.INTEGER,
    },
    rfTirePressure: {
      type: DataTypes.INTEGER,
    },
    lfTirePressure: {
      type: DataTypes.INTEGER,
    },
    rrTirePressure: {
      type: DataTypes.INTEGER,
    },
    rlTirePressure: {
      type: DataTypes.INTEGER,
    },
    rfTireTemp: {
      type: DataTypes.INTEGER,
    },
    lfTireTemp: {
      type: DataTypes.INTEGER,
    },
    rrTireTemp: {
      type: DataTypes.INTEGER,
    },
    rlTireTemp: {
      type: DataTypes.INTEGER,
    },
    carChassis: {
      type: DataTypes.INTEGER,
    },
  });

  Sensor.associate = (models) => {
    Sensor.belongsTo(models.Car, {
      targetKey: 'chassis',
      foreignKey: 'carChassis',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Sensor;
};
