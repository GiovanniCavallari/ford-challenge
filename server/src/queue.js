import Queue from './lib/Queue';
import ExpoServer from './lib/ExpoServer';
import getQueueSensorsWithConfigs from './services/GetQueueSensorsWithConfigs';
import waitToExecute from './utils/waitToExecute';

async function producer(page = 0) {
  const sendPushNotifications = (sensor) => {
    ExpoServer.sendPushNotifications({
      title: 'Alerta',
      body: `Problema no sensor ${sensor}`,
    });
  };

  const dbPage = page + 1;
  const sensors = await getQueueSensorsWithConfigs(dbPage);

  for (const sensor of sensors) {
    const queueMessage = {
      name: sensor.name,
      value: sensor.value,
      translation: sensor.translation,
      error: false,
      carChassis: sensor.carChassis,
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
        sendPushNotifications(sensor.translation);
      } else if (sensor.configurations.direction === 'decreasing' && sensor.value <= parsedConfigValue) {
        queueMessage.error = true;
        sendPushNotifications(sensor.translation);
      } else if (sensor.configurations.type === 'boolean' && sensor.value === false) {
        queueMessage.error = true;
        sendPushNotifications(sensor.translation);
      }
    }

    Queue.add(JSON.stringify(queueMessage));
  }

  waitToExecute(2000, () => producer(dbPage));
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
