import { Router } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import swaggerOptions from './config/swagger';

import CarsController from './controllers/CarsController';
import SensorsController from './controllers/SensorsController';
import ConfigurationsController from './controllers/ConfigurationsController';
import ReviewsController from './controllers/ReviewsController';
import AlertsController from './controllers/AlertsController';

const routes = Router();

const swaggerDocs = swaggerJsDoc(swaggerOptions);
routes.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

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

export default routes;
