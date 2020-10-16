import SensorsRepository from '../repositories/SensorsRepository';
import ConfigurationsRepository from '../repositories/ConfigurationsRepository';
import { sensorNameTranslations } from '../utils/sensorNameTranslations';

async function getQueueSensorsWithConfigs() {
  const sensors = await SensorsRepository.getAllSensors();
  const queueSensors = [];

  for (const sensor of sensors) {
    for (const name in sensor.dataValues) {
      if (name !== 'carChassis') {
        const sensorWithConfigs = ConfigurationsRepository.getConfigurationByName(name, sensor.carChassis).then(
          (resolve) => {
            return {
              name,
              translation: sensorNameTranslations[name],
              value: sensor[name],
              configurations: resolve,
              carChassis: sensor.carChassis,
            };
          },
        );

        queueSensors.push(sensorWithConfigs);
      }
    }
  }

  return Promise.all(queueSensors);
}

export default getQueueSensorsWithConfigs;
