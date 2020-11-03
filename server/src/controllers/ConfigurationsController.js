import ConfigurationsRepository from '../repositories/ConfigurationsRepository';
import errorResponse from '../utils/errorResponse';

async function update(request, response) {
  const { id } = request.params;
  const { active, value } = request.body;

  if (typeof active !== 'boolean' || (value && typeof value !== 'number')) {
    const message = 'Invalid type for active or value';
    return errorResponse(response, 400, message);
  }

  const data = { active, value };
  const updated = await ConfigurationsRepository.updateConfiguration(id, data);

  if (!updated) {
    const message = 'Internal server error';
    return errorResponse(response, 500, message);
  }

  return response.status(204).send();
}

export default { update };
