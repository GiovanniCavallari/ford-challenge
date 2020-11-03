import { Router } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import swaggerOptions from './config/swagger';

import CarsController from './controllers/CarsController';
import SensorsController from './controllers/SensorsController';
import ConfigurationsController from './controllers/ConfigurationsController';
import ReviewsController from './controllers/ReviewsController';
import AlertsController from './controllers/AlertsController';
import TokensController from './controllers/TokensController';

const routes = Router();

const swaggerDocs = swaggerJsDoc(swaggerOptions);
routes.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

routes.get('/', (request, response) => {
  return response.send('Ford Challenge');
});

/**
 * @swagger
 * /cars/{chassis}:
 *  get:
 *    tags:
 *      - Cars
 *    description: Get all car information
 *    parameters:
 *       - name: chassis
 *         description: Chassis to identify car
 *         in: path
 *         required: true
 *         type: integer
 *    responses:
 *      '200':
 *        description: Successful response
 *      '404':
 *        description: Car not found
 */
routes.get('/cars/:chassis', CarsController.index);

/**
 * @swagger
 * /cars/{chassis}/sensors:
 *  get:
 *    tags:
 *      - Sensors
 *    description: Get all car sensors information
 *    parameters:
 *       - name: chassis
 *         description: Chassis to identify car
 *         in: path
 *         required: true
 *         type: integer
 *    responses:
 *      '200':
 *        description: Successful response
 *      '404':
 *        description: Car not found
 */
routes.get('/cars/:chassis/sensors', SensorsController.index);

/**
 * @swagger
 * /cars/{chassis}/sensors/{name}:
 *  get:
 *    tags:
 *      - Sensors
 *    description: Get sensor information and its configurations
 *    parameters:
 *       - name: chassis
 *         description: Chassis to identify car
 *         in: path
 *         required: true
 *         type: integer
 *       - name: name
 *         description: Name to identify sensor
 *         in: path
 *         required: true
 *         type: string
 *    responses:
 *      '200':
 *        description: Successful response
 *      '400':
 *        description: Invalid sensor name
 */
routes.get('/cars/:chassis/sensors/:name', SensorsController.show);

/**
 * @swagger
 * /cars/{chassis}/reviews:
 *  get:
 *    tags:
 *      - Reviews
 *    description: Get all car reviews
 *    parameters:
 *       - name: chassis
 *         description: Chassis to identify car
 *         in: path
 *         required: true
 *         type: integer
 *    responses:
 *      '200':
 *        description: Successful response
 *      '404':
 *        description: Reviews for car not found
 */
routes.get('/cars/:chassis/reviews', ReviewsController.index);

/**
 * @swagger
 * /cars/{chassis}/alerts:
 *  get:
 *    tags:
 *      - Alerts
 *    description: Get all car alerts
 *    parameters:
 *       - name: chassis
 *         description: Chassis to identify car
 *         in: path
 *         required: true
 *         type: integer
 *    responses:
 *      '200':
 *        description: Successful response
 *      '404':
 *        description: Alerts for car not found
 */
routes.get('/cars/:chassis/alerts', AlertsController.index);

/**
 * @swagger
 * /cars/{chassis}/alerts/{id}:
 *  get:
 *    tags:
 *      - Alerts
 *    description: Get alert information and possible solutions
 *    parameters:
 *       - name: chassis
 *         description: Chassis to identify car
 *         in: path
 *         required: true
 *         type: integer
 *       - name: id
 *         description: Id to identify alert
 *         in: path
 *         required: true
 *         type: integer
 *    responses:
 *      '200':
 *        description: Successful response
 *      '404':
 *        description: Car or Alert not found
 */
routes.get('/cars/:chassis/alerts/:id', AlertsController.show);

/**
 * @swagger
 * /cars/{chassis}/alerts:
 *  post:
 *    tags:
 *      - Alerts
 *    description: Create alert
 *    consumes:
 *      - application/json
 *    parameters:
 *       - name: chassis
 *         description: Chassis to identify car
 *         in: path
 *         required: true
 *         type: integer
 *       - name: body
 *         description: Request body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             sensor:
 *               type: string
 *             notification:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *         required:
 *           - title
 *           - description
 *           - sensor
 *           - notification
 *    responses:
 *      '201':
 *        description: Successful response
 *      '400':
 *        description: Invalid sensor name or invalid type for "title", "description" or "notification"
 *      '404':
 *        description: Car not found
 *      '500':
 *        description: Error to create alert
 */
routes.post('/cars/:chassis/alerts', AlertsController.create);

/**
 * @swagger
 * /cars/{chassis}/alerts/{id}:
 *  patch:
 *    tags:
 *      - Alerts
 *    description: Update alert opened status
 *    consumes:
 *      - application/json
 *    parameters:
 *       - name: chassis
 *         description: Chassis to identify car
 *         in: path
 *         required: true
 *         type: integer
 *       - name: id
 *         description: Id to identify alert
 *         in: path
 *         required: true
 *         type: integer
 *       - name: body
 *         description: Request body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             opened:
 *               type: boolean
 *         required:
 *           - opened
 *    responses:
 *      '201':
 *        description: Successful response
 *      '400':
 *        description: Invalid type for "opened"
 *      '404':
 *        description: Car or Alert not found
 */
routes.patch('/cars/:chassis/alerts/:id', AlertsController.update);

/**
 * @swagger
 * /configurations/{id}:
 *  patch:
 *    tags:
 *      - Configurations
 *    description: Update sensor configurations
 *    consumes:
 *      - application/json
 *    parameters:
 *       - name: id
 *         description: Configuration ID
 *         in: path
 *         required: true
 *         type: integer
 *       - name: body
 *         description: Request body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             active:
 *               type: boolean
 *             value:
 *               type: number
 *         required:
 *           - active
 *           - value
 *    responses:
 *      '204':
 *        description: Successful response
 *      '400':
 *        description: Invalid type for "active" or "value"
 *      '500':
 *        description: Internal Server Error
 */
routes.patch('/configurations/:id', ConfigurationsController.update);

/**
 * @swagger
 * /cars/{chassis}/tokens/{id}:
 *  get:
 *    tags:
 *      - Tokens
 *    description: Get token id
 *    parameters:
 *       - name: chassis
 *         description: Chassis to identify car
 *         in: path
 *         required: true
 *         type: integer
 *       - name: id
 *         description: Id to identify token
 *         in: path
 *         required: true
 *         type: string
 *    responses:
 *      '204':
 *        description: Successful response
 *      '400':
 *        description: Invalid token id
 *      '404':
 *        description: Car or Token not found
 */
routes.get('/cars/:chassis/tokens/:id', TokensController.show);

/**
 * @swagger
 * /cars/{chassis}/tokens:
 *  post:
 *    tags:
 *      - Tokens
 *    description: Save token
 *    consumes:
 *      - application/json
 *    parameters:
 *       - name: chassis
 *         description: Chassis to identify car
 *         in: path
 *         required: true
 *         type: integer
 *       - name: body
 *         description: Request body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *         required:
 *           - token
 *    responses:
 *      '201':
 *        description: Successful response
 *      '400':
 *        description: Invalid type for "token"
 *      '404':
 *        description: Car not found
 *      '500':
 *        description: Internal Server Error
 */
routes.post('/cars/:chassis/tokens', TokensController.create);

export default routes;
