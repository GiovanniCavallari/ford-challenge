require('dotenv').config();

module.exports = {
  development: {
    host: process.env.APPSETTING_PGR_HOST,
    port: process.env.APPSETTING_PGR_PORT,
    username: process.env.APPSETTING_PGR_USER,
    password: process.env.APPSETTING_PGR_PASSWORD,
    database: process.env.APPSETTING_PGR_DB,
    dialect: 'postgres',
  },
  test: {
    host: process.env.APPSETTING_PGR_HOST,
    port: process.env.APPSETTING_PGR_PORT,
    username: process.env.APPSETTING_PGR_USER,
    password: process.env.APPSETTING_PGR_PASSWORD,
    database: process.env.APPSETTING_PGR_DB,
    dialect: 'postgres',
  },
  production: {
    host: process.env.APPSETTING_PGR_HOST,
    port: process.env.APPSETTING_PGR_PORT,
    username: process.env.APPSETTING_PGR_USER,
    password: process.env.APPSETTING_PGR_PASSWORD,
    database: process.env.APPSETTING_PGR_DB,
    dialect: 'postgres',
  },
};
