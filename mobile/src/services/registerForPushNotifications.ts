import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-community/async-storage';
import api from './api';

async function registerForPushNotificationsAsync() {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    const phoneTokenId = await AsyncStorage.getItem('@savedTokenId');

    let validateToken: boolean;
    try {
      await api.get(`/cars/123456/tokens/${phoneTokenId}`);
      validateToken = true;
    } catch (error) {
      validateToken = false;
    }

    if (!phoneTokenId || !validateToken) {
      try {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        const tokenId = await api.post('/cars/123456/tokens', { token });
        await AsyncStorage.setItem('@savedTokenId', tokenId.data.id);
      } catch (error) {
        alert('Error to save token');
      }
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}

export default registerForPushNotificationsAsync;
