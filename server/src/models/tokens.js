module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
    },
    carChassis: {
      type: DataTypes.INTEGER,
    },
  });

  Token.associate = (models) => {
    Token.belongsTo(models.Car, {
      foreignKey: 'carChassis',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Token;
};
