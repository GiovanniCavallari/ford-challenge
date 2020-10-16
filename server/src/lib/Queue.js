import 'dotenv/config';
import { connect } from 'amqplib';
import config from '../config/server';

const {
  rabbitmq: { rabbitmqDefaultUser, rabbitmqDefaultPass, rabbitmqHost },
} = config[process.env.NODE_ENV];

const queue = 'messages';
const connection = connect(`amqp://${rabbitmqDefaultUser}:${rabbitmqDefaultPass}@${rabbitmqHost}`);

const add = (message) => {
  connection
    .then((conn) => {
      return conn.createChannel();
    })
    .then((ch) => {
      console.log('Enviando mensagem');
      ch.sendToQueue(queue, Buffer.from(message));
    })
    .catch(console.warn);
};

export default { add };
