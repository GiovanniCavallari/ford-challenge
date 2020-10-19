import ExpoServer from '../lib/ExpoServer';
import CarsRepository from '../repositories/CarsRepository';
import AlertsRepository from '../repositories/AlertsRepository';
import errorResponse from '../utils/errorResponse';

async function index(request, response) {
  const { chassis } = request.params;

  const alerts = await AlertsRepository.getAlertsByCarChassis(chassis);

  if (!alerts || alerts.length === 0) {
    const message = `Alerts for car with chassis ${chassis} not found`;
    return errorResponse(response, 404, message);
  }

  return response.json(alerts);
}

async function create(request, response) {
  const { chassis } = request.params;
  const {
    type,
    description,
    notification: { title, body },
  } = request.body;

  if (typeof type !== 'string' || typeof description !== 'string') {
    const message = 'Invalid type for "type" or "description"';
    return errorResponse(response, 400, message);
  }

  const car = await CarsRepository.getCarByChassis(chassis);

  if (!car) {
    const message = `Car with chassis ${chassis} not found`;
    return errorResponse(response, 404, message);
  }

  const data = { type, description, carChassis: chassis };
  const newAlert = await AlertsRepository.createAlert(data);

  if (!newAlert) {
    const message = `Internal Server Error`;
    return errorResponse(response, 500, message);
  }

  console.log(title, body);

  ExpoServer.sendPushNotifications({ title, body });
  return response.status(201).json(newAlert);
}

export default { index, create };
