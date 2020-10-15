require('dotenv').config();

module.exports = {
  development: {
    host: process.env.PGR_HOST,
    port: process.env.PGR_PORT,
    username: process.env.PGR_USER,
    password: process.env.PGR_PASSWORD,
    database: process.env.PGR_DB,
    dialect: 'postgres',
  },
  test: {
    host: process.env.PGR_HOST,
    port: process.env.PGR_PORT,
    username: process.env.PGR_USER,
    password: process.env.PGR_PASSWORD,
    database: process.env.PGR_DB,
    dialect: 'postgres',
  },
  production: {
    host: process.env.PGR_HOST,
    port: process.env.PGR_PORT,
    username: process.env.PGR_USER,
    password: process.env.PGR_PASSWORD,
    database: process.env.PGR_DB,
    dialect: 'postgres',
  },
};
