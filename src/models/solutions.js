module.exports = (sequelize, DataTypes) => {
  const Solution = sequelize.define('Solution', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    sensor: {
      type: DataTypes.STRING,
    },
  });

  return Solution;
};
