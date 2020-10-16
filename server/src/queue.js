import Queue from './lib/Queue';

Queue.add();

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
