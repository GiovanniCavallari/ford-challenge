export default {
  swaggerDefinition: {
    info: {
      title: 'Ford AV API',
      description: 'API developed for the Ford Challenge in partnership with FIAP',
      version: `${process.env.APPSETTING_API_VERSION}`,
      servers: [`${process.env.APPSETTING_SERVER_URL}:${process.env.APPSETTING_SERVER_PORT}`],
      basePath: '/api',
    },
  },
  apis: ['src/routes.js'],
};
