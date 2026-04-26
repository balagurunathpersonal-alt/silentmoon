import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";

let isConfigured = false;

export const configureNotifications = () => {
  if (isConfigured) {
    return;
  }

  PushNotification.configure({
    onNotification: () => {},
    popInitialNotification: true,
    requestPermissions: Platform.OS === "ios",
  });

  if (Platform.OS === "android") {
    PushNotification.createChannel(
      {
        channelId: "silent-moon",
        channelName: "Silent Moon",
        importance: 4,
        soundName: "default",
        vibrate: true,
      },
      () => {},
    );
  }

  isConfigured = true;
};
