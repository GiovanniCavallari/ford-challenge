import errorResponse from '../utils/errorResponse';
import CarsRepository from '../repositories/CarsRepository';
import getCarSensorsWithConfigs from '../services/GetCarSensorsWithConfigs';

async function index(request, response) {
  const { chassis } = request.params;

  const car = await CarsRepository.getCarByChassis(chassis);

  if (!car) {
    const message = `Car with chassis ${chassis} not found`;
    return errorResponse(response, 404, message);
  }

  const { name, model, licensePlate } = car;
  const sensors = await getCarSensorsWithConfigs(chassis, car.sensors);

  return response.json({ chassis: Number(chassis), name, model, licensePlate, sensors });
}

export default { index };
