import ConfigurationsRepository from '../repositories/ConfigurationsRepository';
import { sensorNameTranslations } from '../utils/sensorNameTranslations';

async function getCarSensorsWithConfigs(chassis, sensors) {
  const carSensors = [];

  for (const sensor of sensors) {
    for (const name in sensor.dataValues) {
      const sensorWithConfigs = ConfigurationsRepository.getConfigurationByName(name, chassis).then((resolve) => {
        return {
          name,
          translation: sensorNameTranslations[name],
          value: sensor[name],
          configurations: resolve,
        };
      });

      carSensors.push(sensorWithConfigs);
    }
  }

  return Promise.all(carSensors);
}

export default getCarSensorsWithConfigs;
