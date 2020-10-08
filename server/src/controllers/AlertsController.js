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

export default { index };
