import 'dotenv/config';
import config from './server';

const serverConfig = config[process.env.NODE_ENV];

export default {
  swaggerDefinition: {
    info: {
      title: 'Ford AV API',
      description: 'API developed for the Ford Challenge in partnership with FIAP',
      version: `${serverConfig.apiVersion}`,
      servers: [`${serverConfig.url}:${serverConfig.port}`],
      basePath: '/',
    },
  },
  apis: ['src/routes.js'],
};
