import 'dotenv/config';
import { connect } from 'amqplib';
import config from '../config/server';

const {
  rabbitmq: { rabbitmqDefaultUser, rabbitmqDefaultPass, rabbitmqHost },
} = config[process.env.NODE_ENV];

const queue = 'messages';
const connection = connect(`amqp://${rabbitmqDefaultUser}:${rabbitmqDefaultPass}@${rabbitmqHost}`);

const message = {
  name: 'giovanni',
  email: 'email@email.com',
};

const add = () => {
  connection
    .then((conn) => {
      console.log('Conectado');
      return conn.createChannel();
    })
    .then((ch) => {
      console.log('Canal criado');
      console.log('Enviando mensagem');
      ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    })
    .catch(console.warn);
};

export default { add };
