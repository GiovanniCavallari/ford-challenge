import CarsRepository from '../repositories/CarsRepository';
import TokensRepository from '../repositories/TokensRepository';
import errorResponse from '../utils/errorResponse';

async function create(request, response) {
  const { chassis } = request.params;
  const { token } = request.body;

  if (typeof token !== 'string') {
    const message = 'Invalid type for "token"';
    return errorResponse(response, 400, message);
  }

  const car = await CarsRepository.getCarByChassis(chassis);

  if (!car) {
    const message = `Car with chassis ${chassis} not found`;
    return errorResponse(response, 404, message);
  }

  const data = { token, carChassis: chassis };
  const newToken = await TokensRepository.createToken(data);

  if (!newToken) {
    const message = `Internal Server Error`;
    return errorResponse(response, 500, message);
  }

  return response.status(201).send();
}

export default { create };
