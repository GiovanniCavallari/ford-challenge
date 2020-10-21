module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    chassis: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    licensePlate: {
      type: DataTypes.STRING,
    },
  });

  Car.associate = (models) => {
    Car.hasMany(models.Sensor, {
      sourceKey: 'chassis',
      foreignKey: 'carChassis',
      as: 'sensors',
    });

    Car.hasMany(models.Alert, {
      foreignKey: 'carChassis',
      as: 'alerts',
    });

    Car.hasMany(models.Review, {
      foreignKey: 'carChassis',
      as: 'reviews',
    });

    Car.hasMany(models.Configuration, {
      foreignKey: 'carChassis',
      as: 'configurations',
    });

    Car.hasMany(models.Token, {
      foreignKey: 'carChassis',
      as: 'tokens',
    });
  };

  return Car;
};
