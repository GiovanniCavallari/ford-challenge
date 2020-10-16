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
  const { type, description } = request.body;

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
  const alert = await AlertsRepository.createAlert(data);

  if (!alert) {
    const message = `Internal Server Error`;
    return errorResponse(response, 500, message);
  }

  return response.status(201).json(alert);
}

export default { index, create };
