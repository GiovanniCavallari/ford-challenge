import ConfigurationsRepository from '../repositories/ConfigurationsRepository';

async function getSensorsWithConfigs(chassis, sensors) {
  const carSensors = [];

  for (const sensor of sensors) {
    for (const name in sensor.dataValues) {
      const sensorWithConfigs = ConfigurationsRepository.getConfigurationByName(name, chassis).then((resolve) => {
        return {
          name,
          value: sensor[name],
          configurations: resolve,
        };
      });

      carSensors.push(sensorWithConfigs);
    }
  }

  return Promise.all(carSensors);
}

export default getSensorsWithConfigs;
