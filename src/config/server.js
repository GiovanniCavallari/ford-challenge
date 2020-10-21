require('dotenv').config();

module.exports = {
  development: {
    url: 'http://localhost',
    port: 3333,
    apiVersion: '0.1.0',
    database: {
      pgrDb: 'fordva',
      pgrPort: 15432,
      pgrHost: 'localhost',
      pgrUser: 'postgres',
      pgrPassword: 'root',
      dialect: 'postgres',
    },
    dbAdmin: {
      pgAdminPort: 16543,
      pgAdminDefaultEmail: 'email@email.com',
      pgAdminDefaultPassword: 123456,
      dockerDataFolder: '~/docker-data',
    },
    rabbitmq: {
      rabbitmqHost: 'localhost',
      rabbitmqErlangCookie: 'topSecretCookieErlang2020',
      rabbitmqDefaultUser: 'rabbitmq',
      rabbitmqDefaultPass: 'rabbitmq',
    },
  },
  production: {
    url: process.env.SERVER_URL,
    port: process.env.SERVER_PORT,
    apiVersion: process.env.API_VERSION,
    database: {
      pgrDb: process.env.PGR_DB,
      pgrPort: process.env.PGR_PORT,
      pgrHost: process.env.PGR_HOST,
      pgrUser: process.env.PGR_USER,
      pgrPassword: process.env.PGR_PASSWORD,
      dialect: 'postgres',
    },
    dbAdmin: {
      pgAdminPort: process.env.PGADMIN_PORT,
      pgAdminDefaultEmail: process.env.PGADMIN_DEFAULT_EMAIL,
      pgAdminDefaultPassword: process.env.PGADMIN_DEFAULT_PASSWORD,
      dockerDataFolder: process.env.DOCKER_DATA_FOLDER,
    },
    rabbitmq: {
      rabbitmqHost: process.env.RABBITMQ_HOST,
      rabbitmqErlangCookie: process.env.RABBITMQ_ERLANG_COOKIE,
      rabbitmqDefaultUser: process.env.RABBITMQ_DEFAULT_USER,
      rabbitmqDefaultPass: process.env.RABBITMQ_DEFAULT_PASS,
    },
  },
};
