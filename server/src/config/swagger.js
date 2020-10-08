export default {
  swaggerDefinition: {
    info: {
      title: 'Ford AV API',
      description: 'API developed for the Ford Challenge in partnership with FIAP',
      version: `${process.env.API_VERSION}`,
      servers: [`${process.env.SERVER_URL}:${process.env.SERVER_PORT}`],
      basePath: '/api',
    },
  },
  apis: ['src/routes.js'],
};
