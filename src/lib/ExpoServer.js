import { Expo } from 'expo-server-sdk';
import TokensRepository from '../repositories/TokensRepository';

const expo = new Expo();

async function sendPushNotifications({ title, body }) {
  const notifications = [];

  const savedTokens = await TokensRepository.getAllTokens();

  for (const savedToken of savedTokens) {
    const { token } = savedToken;

    if (!Expo.isExpoPushToken(token)) {
      console.error(`Push token ${token} is not a valid Expo push token`);
      continue;
    }

    notifications.push({
      to: token,
      sound: 'default',
      title,
      body,
      data: { body },
    });
  }

  const tickets = [];
  const chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
        console.log(ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
}

export default { sendPushNotifications };
