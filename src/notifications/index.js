import * as Notifications from 'expo-notifications';
import api from '../api';

async function registerForPushNotificationsAsync(accessToken) {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
  }
  if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Notifications token: ' + token);

  try {
    await api.user.linkDevice(accessToken, token)
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export {
  registerForPushNotificationsAsync
}