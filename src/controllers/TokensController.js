import { validate } from 'uuid';
import CarsRepository from '../repositories/CarsRepository';
import TokensRepository from '../repositories/TokensRepository';
import errorResponse from '../utils/errorResponse';

async function show(request, response) {
  const { chassis, id } = request.params;

  if (!validate(id)) {
    const message = 'Invalid token id';
    return errorResponse(response, 400, message);
  }

  const car = await CarsRepository.getCarByChassis(chassis);

  if (!car) {
    const message = `Car with chassis ${chassis} not found`;
    return errorResponse(response, 404, message);
  }

  const token = await TokensRepository.getTokenById(id);

  if (!token) {
    const message = `Token with id ${id} not found`;
    return errorResponse(response, 404, message);
  }

  return response.status(204).send();
}

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

  return response.status(201).json({ id: newToken.id });
}

export default { show, create };
