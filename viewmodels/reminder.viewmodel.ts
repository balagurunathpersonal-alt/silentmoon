import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import { useAppNavigationHandler } from "../navigation/app-navigation";
import { configureNotifications } from "../services/notification-service";
import type { RootStackParamList } from "../types/navigation";

const days = ["SU", "M", "T", "W", "TH", "F", "S"];
const MAX_ANDROID_NOTIFICATION_ID = 2147483647;

const getNextReminderDate = (selectedTime: Date, weekdayIndex: number) => {
  const now = new Date();
  const reminderDate = new Date(now);

  reminderDate.setHours(
    selectedTime.getHours(),
    selectedTime.getMinutes(),
    0,
    0,
  );

  let dayDiff = (weekdayIndex - now.getDay() + 7) % 7;
  if (dayDiff === 0 && reminderDate <= now) {
    dayDiff = 7;
  }

  reminderDate.setDate(now.getDate() + dayDiff);
  return reminderDate;
};

const requestNotificationPermission = async () => {
  if (Platform.OS === "android" && Platform.Version >= 33) {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  if (Platform.OS === "ios") {
    const result = await PushNotification.requestPermissions();
    return Boolean(result.alert || result.badge || result.sound);
  }

  return true;
};

const createNotificationId = (weekdayIndex: number) => {
  const timestampPart = Date.now() % 1000000000;
  const id = timestampPart + weekdayIndex;

  return String(id % MAX_ANDROID_NOTIFICATION_ID);
};

const getScheduledLocalNotifications = () =>
  new Promise<unknown[]>((resolve) => {
    PushNotification.getScheduledLocalNotifications((notifications: unknown[]) => {
      resolve(notifications);
    });
  });

export const useReminderViewModel = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Reminder">>();
  const navigation = useAppNavigationHandler();
  const topic = route.params?.topicTitle ?? route.params?.topic;

  const [time, setTime] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [scheduledIds, setScheduledIds] = useState<string[]>([]);

  useEffect(() => {
    configureNotifications();
  }, []);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const scheduleReminder = async () => {
    if (selectedDays.length === 0) {
      Alert.alert("Please select at least one day");
      return;
    }

    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      Alert.alert(
        "Notifications are off",
        "Please allow notifications to receive meditation reminders.",
      );
      return;
    }

    const ids: string[] = [];
    const finalTopic = topic ?? "your topic";
    const scheduledDates: Date[] = [];

    for (const day of selectedDays) {
      const weekdayIndex = days.indexOf(day); // 0 (Sun) .. 6 (Sat)
      const candidate = getNextReminderDate(time, weekdayIndex);

      const idStr = createNotificationId(weekdayIndex);

      PushNotification.localNotificationSchedule({
        /* Android-only channelId */
        channelId: "silent-moon",
        id: idStr,
        title: `Meditate: ${finalTopic}`,
        message: `Time to meditate on ${finalTopic} 🌙`,
        date: candidate,
        allowWhileIdle: true,
        ignoreInForeground: false,
        playSound: true,
        repeatType: "week",
        soundName: "default",
      });

      ids.push(idStr);
      scheduledDates.push(candidate);
    }
    setScheduledIds((prev) => [...prev, ...ids]);

    const scheduledNotifications = await getScheduledLocalNotifications();
    const savedIds = new Set(
      scheduledNotifications.map((notification) =>
        String((notification as { id?: string | number }).id),
      ),
    );
    const didSchedule = ids.some((id) => savedIds.has(id));

    if (!didSchedule) {
      Alert.alert(
        "Reminder could not be scheduled",
        "Android may be blocking exact alarms for Silent Moon. Please enable Alarms & reminders for the app in Android settings and try again.",
      );
      return;
    }

    const nextReminder = scheduledDates
      .sort((a, b) => a.getTime() - b.getTime())[0]
      ?.toLocaleString([], {
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
      });

    Alert.alert(
      "Reminder saved successfully!",
      nextReminder ? `Next reminder: ${nextReminder}` : undefined,
    );
    navigation.resetTo("MainTabs");
  };

  const cancelScheduled = async () => {
    try {
      for (const id of scheduledIds) {
        PushNotification.cancelLocalNotifications({ id });
      }
      setScheduledIds([]);
      Alert.alert("Canceled", "All scheduled reminders canceled.");
    } catch (e) {
      Alert.alert("Error", "Failed to cancel reminders");
    }
  };

  return {
    topic,
    time,
    setTime,
    showPicker,
    setShowPicker,
    selectedDays,
    toggleDay,
    scheduleReminder,
    cancelScheduled,
    scheduledIds,
  };
};
