import SensorsRepository from '../repositories/SensorsRepository';

async function updateQueueSensors(id) {
  const sensorsData = await SensorsRepository.getSensorsById(id);
  if (sensorsData) {
    await SensorsRepository.updateApiSensorsLine(sensorsData);
  }
}

export default updateQueueSensors;
