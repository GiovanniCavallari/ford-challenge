module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
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

  Review.associate = (models) => {
    Review.belongsTo(models.Car, {
      foreignKey: 'carChassis',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Review;
};
