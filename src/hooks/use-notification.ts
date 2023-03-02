import * as Notifications from 'expo-notifications';
import { Subscription } from "expo-modules-core";
import {Platform} from 'react-native';
import * as Device from 'expo-device';
import { useEffect, useRef, useState } from 'react';
import { Notification } from 'expo-notifications';

export function useNotification() {
	const notificationListener = useRef<Subscription>();
	const responseListener = useRef<Subscription>();
	const [notification, setNotification] = useState<Notification>();

	async function registerForPushNotificationsAsync() {
	  let token;

	  if (Platform.OS === 'android') {
	    await Notifications.setNotificationChannelAsync('media-player', {
	      name: 'Media Player',
				sound: "default",
	      importance: Notifications.AndroidImportance.MAX,
	      vibrationPattern: [0, 250, 250, 250],
	      lightColor: '#FF231F7C',
				audioAttributes: {contentType: Notifications.AndroidAudioContentType.MUSIC},
	    });
	  }

	  if (Device.isDevice) {
	    const { status: existingStatus } = await Notifications.getPermissionsAsync();
	    let finalStatus = existingStatus;
	    if (existingStatus !== 'granted') {
	      const { status } = await Notifications.requestPermissionsAsync();
	      finalStatus = status;
	    }
	    if (finalStatus !== 'granted') {
	      alert('Failed to get push token for push notification!');
	      return;
	    }
			try {
		    token = (await Notifications.getExpoPushTokenAsync()).data;
		    console.log("Token", token);
			} catch (err) {
				console.log("Failed", err);
			};
	  } else {
	    alert('Must use physical device for Push Notifications');
	  }

	  return token;
	}
		
	useEffect(() => {
		registerForPushNotificationsAsync().then(_token => {});
		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			setNotification(notification);
		});
		responseListener.current = Notifications.addNotificationReceivedListener(response => {
			console.log(response)
		});
		return () => {
			if (notificationListener.current) Notifications.removeNotificationSubscription(notificationListener.current);
			if (responseListener.current) Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	return { notification, Notifications };
};

