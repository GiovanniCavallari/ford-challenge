require('dotenv').config();
const config = require('./server');

module.exports = {
  development: {
    host: config.development.database.pgrHost,
    port: config.development.database.pgrPort,
    username: config.development.database.pgrUser,
    password: config.development.database.pgrPassword,
    database: config.development.database.pgrDb,
    dialect: config.development.database.dialect,
  },
  production: {
    host: config.production.database.pgrHost,
    port: config.production.database.pgrPort,
    username: config.production.database.pgrUser,
    password: config.production.database.pgrPassword,
    database: config.production.database.pgrDb,
    dialect: config.production.database.dialect,
    dialectOptions: {
      ssl: true,
      rejectUnauthorized: false,
    },
  },
};
