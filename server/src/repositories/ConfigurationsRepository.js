import { Configuration } from '../models';

async function getConfigurationByName(name, chassis) {
  try {
    const configuration = await Configuration.findOne({
      attributes: ['id', 'name', 'active', 'value', 'type', 'message', 'unit', 'direction'],
      where: { name, carChassis: chassis },
    });
    return configuration;
  } catch (error) {
    return false;
  }
}

async function updateConfiguration(id, data) {
  try {
    const configuration = await Configuration.update(data, {
      where: { id },
    });
    return configuration;
  } catch (error) {
    return false;
  }
}

export default { getConfigurationByName, updateConfiguration };
