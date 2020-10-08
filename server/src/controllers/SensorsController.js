import SensorsRepository from '../repositories/SensorsRepository';
import ConfigurationsRepository from '../repositories/ConfigurationsRepository';
import errorResponse from '../utils/errorResponse';
import getSensorsWithConfigs from '../services/GetSensorsWithConfigs';
import { validateSensorName } from '../utils/validateSensor';

async function index(request, response) {
  const { chassis } = request.params;

  const sensors = await SensorsRepository.getSensorsByCarChassis(chassis);

  if (!sensors) {
    const message = `Car with chassis ${chassis} not found`;
    return errorResponse(response, 404, message);
  }

  const serializedSensors = await getSensorsWithConfigs(chassis, sensors);

  return response.json(serializedSensors);
}

async function show(request, response) {
  const { chassis, name } = request.params;

  if (!validateSensorName(name)) {
    const message = 'Invalid sensor name';
    return errorResponse(response, 400, message);
  }

  const sensor = await SensorsRepository.getSensorsByName(name, chassis);
  const configurations = await ConfigurationsRepository.getConfigurationByName(name, chassis);

  return response.json({ name, value: sensor[name], configurations });
}

export default { index, show };
