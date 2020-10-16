import { connect } from 'amqplib';

const connection = connect('amqp://rabbitmq:rabbitmq@localhost');
const queue = 'messages';

// Producer
connection
  .then((conn) => {
    console.log('Conectado');
    return conn.createChannel();
  })
  .then((ch) => {
    console.log('Canal criado');
    setInterval(() => {
      console.log('Enviando mensagens');
      ch.sendToQueue(queue, Buffer.from('Hello World'));
    }, 1000);
  })
  .catch(console.warn);

// Consumer
connection
  .then((conn) => {
    return conn.createChannel();
  })
  .then(async (ch) => {
    await ch.assertQueue(queue);

    ch.prefetch(1);
    ch.consume(queue, (msg) => {
      setTimeout(() => {
        if (msg !== null) {
          console.log(`Mensagem recebida - ${new Date()}: ${msg.content.toString()}`);
          ch.ack(msg);
        }
      }, 500);
    });
  })
  .catch(console.warn);
