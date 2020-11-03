import Queue from './lib/Queue';
import SolutionsRepository from './repositories/SolutionsRepository';
import getQueueSensorsWithConfigs from './services/GetQueueSensorsWithConfigs';
import updateQueueSensors from './services/UpdateQueueSensors';
import waitToExecute from './utils/waitToExecute';

async function producer(page = 0) {
  const dbPage = page + 1;
  const sensors = await getQueueSensorsWithConfigs(dbPage);
  await updateQueueSensors(dbPage);

  for (const sensor of sensors) {
    const solutions = await SolutionsRepository.getSolutionsBySensorName(sensor.name);

    const queueMessage = {
      name: sensor.name,
      value: sensor.value,
      translation: sensor.translation,
      error: false,
      carChassis: sensor.carChassis,
      solutions,
      configurations: {
        unit: sensor.configurations.unit,
        value: sensor.configurations.value,
        active: sensor.configurations.active,
        direction: sensor.configurations.direction,
      },
    };

    const parsedConfigValue = Number(sensor.configurations.value);
    if (sensor.configurations.active) {
      if (sensor.configurations.direction === 'increasing' && sensor.value >= parsedConfigValue) {
        queueMessage.error = true;
      } else if (sensor.configurations.direction === 'decreasing' && sensor.value <= parsedConfigValue) {
        queueMessage.error = true;
      } else if (sensor.configurations.type === 'boolean' && sensor.value === false) {
        queueMessage.error = true;
      }
    }

    Queue.add(JSON.stringify(queueMessage));
  }

  waitToExecute(5000, () => producer(dbPage));
}

producer();
