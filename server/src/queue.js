import Queue from './lib/Queue';
import getQueueSensorsWithConfigs from './services/GetQueueSensorsWithConfigs';

async function producer() {
  const sensors = await getQueueSensorsWithConfigs();

  for (const sensor of sensors) {
    const queueMessage = {
      name: sensor.name,
      value: sensor.value,
      translation: sensor.translation,
      error: false,
      message: 'No error',
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
        queueMessage.message = 'Error increasing';
      } else if (sensor.configurations.direction === 'decreasing' && sensor.value <= parsedConfigValue) {
        queueMessage.error = true;
        queueMessage.message = 'Error decreasing';
      }
    }

    Queue.add(JSON.stringify(queueMessage));
  }
}

producer();

// Consumer
// connection
//   .then((conn) => {
//     return conn.createChannel();
//   })
//   .then(async (ch) => {
//     await ch.assertQueue(queue);

//     ch.prefetch(1);
//     ch.consume(queue, (msg) => {
//       if (msg !== null) {
//         const message = JSON.parse(msg.content);
//         console.log(`Mensagem recebida: ${message.name} - ${message.email}`);
//         ch.ack(msg);
//       }
//     });
//   })
//   .catch(console.warn);
