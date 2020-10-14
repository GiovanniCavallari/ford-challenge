require('dotenv').config();

module.exports = {
  development: {
    host: process.env.APPLICATION_PGR_HOST,
    port: process.env.APPLICATION_PGR_PORT,
    username: process.env.APPLICATION_PGR_USER,
    password: process.env.APPLICATION_PGR_PASSWORD,
    database: process.env.APPLICATION_PGR_DB,
    dialect: 'postgres',
  },
  test: {
    host: process.env.APPLICATION_PGR_HOST,
    port: process.env.APPLICATION_PGR_PORT,
    username: process.env.APPLICATION_PGR_USER,
    password: process.env.APPLICATION_PGR_PASSWORD,
    database: process.env.APPLICATION_PGR_DB,
    dialect: 'postgres',
  },
  production: {
    host: process.env.APPLICATION_PGR_HOST,
    port: process.env.APPLICATION_PGR_PORT,
    username: process.env.APPLICATION_PGR_USER,
    password: process.env.APPLICATION_PGR_PASSWORD,
    database: process.env.APPLICATION_PGR_DB,
    dialect: 'postgres',
  },
};
