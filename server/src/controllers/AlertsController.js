import ExpoServer from '../lib/ExpoServer';
import CarsRepository from '../repositories/CarsRepository';
import AlertsRepository from '../repositories/AlertsRepository';
import SensorsRepository from '../repositories/SensorsRepository';
import SolutionsRepository from '../repositories/SolutionsRepository';
import errorResponse from '../utils/errorResponse';
import { validateSensorName } from '../utils/validateSensor';

async function index(request, response) {
  const { chassis } = request.params;

  const alerts = await AlertsRepository.getAlertsByCarChassis(chassis);

  if (!alerts || alerts.length === 0) {
    const message = `Alerts for car with chassis ${chassis} not found`;
    return errorResponse(response, 404, message);
  }

  return response.json(alerts);
}

async function show(request, response) {
  const { id, chassis } = request.params;

  const car = await CarsRepository.getCarByChassis(chassis);

  if (!car) {
    const message = `Car with chassis ${chassis} not found`;
    return errorResponse(response, 404, message);
  }

  const alert = await AlertsRepository.getAlertById(id);

  if (!alert) {
    const message = `Alert with id ${id} not found`;
    return errorResponse(response, 404, message);
  }

  const solutions = await SolutionsRepository.getSolutionsBySensorName(alert.sensor);

  return response.json({ ...alert, solutions });
}

async function create(request, response) {
  const { chassis } = request.params;
  const {
    title,
    description,
    sensor,
    notification: { title: notificationTitle, body },
  } = request.body;

  if (!validateSensorName(sensor)) {
    const message = 'Invalid sensor name';
    return errorResponse(response, 400, message);
  }

  if (typeof title !== 'string' || typeof description !== 'string') {
    const message = 'Invalid type for id, title or description';
    return errorResponse(response, 400, message);
  }

  const car = await CarsRepository.getCarByChassis(chassis);

  if (!car) {
    const message = `Car with chassis ${chassis} not found`;
    return errorResponse(response, 404, message);
  }

  const data = { title, description, sensor, carChassis: chassis };
  const newAlert = await AlertsRepository.createAlert(data);

  if (!newAlert) {
    const message = `Error to create alert`;
    return errorResponse(response, 500, message);
  }

  ExpoServer.sendPushNotifications({ title: notificationTitle, body });
  return response.status(201).json(newAlert);
}

async function update(request, response) {
  const { id, chassis } = request.params;
  const { opened } = request.body;

  if (typeof opened !== 'boolean') {
    const message = 'Invalid type for opened';
    return errorResponse(response, 400, message);
  }

  const car = await CarsRepository.getCarByChassis(chassis);

  if (!car) {
    const message = `Car with chassis ${chassis} not found`;
    return errorResponse(response, 404, message);
  }

  const alert = await AlertsRepository.updateAlertOpenedStatus(id, opened);

  if (!alert) {
    const message = `Alert with id ${id} not found`;
    return errorResponse(response, 404, message);
  }

  const solutions = await SolutionsRepository.getSolutionsBySensorName(alert.sensor);

  return response.json({ ...alert, solutions });
}

export default { index, show, create, update };
