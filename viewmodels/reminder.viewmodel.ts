import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import {
  DEFAULT_REMINDER_CONTENT,
  getCustomReminderContent,
  REMINDER_STRINGS,
  TOPIC_REMINDER_CONTENT,
} from "../constants/reminder-strings";
import { useAppNavigationHandler } from "../navigation/app-navigation";
import { configureNotifications } from "../services/notification-service";
import type { RootStackParamList } from "../types/navigation";

const days: readonly string[] = REMINDER_STRINGS.days;
const MAX_ANDROID_NOTIFICATION_ID = 2147483647;

type ReminderRouteParams = RootStackParamList["Reminder"];

const normalizeTopic = (topic?: string) => topic?.trim().toLowerCase();

const getTopicFromRoute = (params: ReminderRouteParams) => {
  const topic =
    params?.selectedTopic?.title ?? params?.topicTitle ?? params?.topic;

  return typeof topic === "string" && topic.trim().length > 0
    ? topic.trim()
    : undefined;
};

const getReminderContent = (topic?: string) => {
  const normalizedTopic = normalizeTopic(topic);

  if (normalizedTopic && TOPIC_REMINDER_CONTENT[normalizedTopic]) {
    return TOPIC_REMINDER_CONTENT[normalizedTopic];
  }

  if (!topic) {
    return DEFAULT_REMINDER_CONTENT;
  }

  return getCustomReminderContent(topic);
};

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
    PushNotification.getScheduledLocalNotifications(
      (notifications: unknown[]) => {
        resolve(notifications);
      },
    );
  });

export const useReminderViewModel = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Reminder">>();
  const navigation = useAppNavigationHandler();
  const topic = getTopicFromRoute(route.params);
  const topicId = route.params?.selectedTopic?.id ?? route.params?.topicId;
  const reminderReturnTo = route.params?.reminderReturnTo;
  const content = getReminderContent(topic);

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

  const closeReminderFlow = () => {
    if (reminderReturnTo === "Profile") {
      navigation.resetTo("MainTabs", { screen: "Profile" });
      return;
    }

    navigation.resetTo("MainTabs");
  };

  const scheduleReminder = async () => {
    if (selectedDays.length === 0) {
      Alert.alert(REMINDER_STRINGS.alerts.selectDayTitle);
      return;
    }

    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      Alert.alert(
        REMINDER_STRINGS.alerts.notificationsOffTitle,
        REMINDER_STRINGS.alerts.notificationsOffMessage,
      );
      return;
    }

    const ids: string[] = [];
    const finalTopic = topic ?? REMINDER_STRINGS.defaultTopic;
    const scheduledDates: Date[] = [];

    for (const day of selectedDays) {
      const weekdayIndex = days.indexOf(day); // 0 (Sun) .. 6 (Sat)
      const candidate = getNextReminderDate(time, weekdayIndex);

      const idStr = createNotificationId(weekdayIndex);

      PushNotification.localNotificationSchedule({
        /* Android-only channelId */
        channelId: "silent-moon",
        id: idStr,
        title: content.notificationTitle,
        message: content.notificationMessage,
        date: candidate,
        allowWhileIdle: true,
        ignoreInForeground: false,
        playSound: true,
        repeatType: "week",
        soundName: "default",
        userInfo: {
          topicId,
          topicTitle: finalTopic,
        },
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
        REMINDER_STRINGS.alerts.notificationBlockedTitle,
        REMINDER_STRINGS.alerts.notificationBlockedMessage,
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
      REMINDER_STRINGS.alerts.reminderSavedTitle,
      nextReminder
        ? `${REMINDER_STRINGS.nextReminderPrefix} ${nextReminder}`
        : undefined,
    );
    closeReminderFlow();
  };

  const cancelScheduled = async () => {
    try {
      for (const id of scheduledIds) {
        PushNotification.cancelLocalNotifications({ id });
      }
      setScheduledIds([]);
      Alert.alert(
        REMINDER_STRINGS.alerts.canceledTitle,
        REMINDER_STRINGS.alerts.canceledMessage,
      );
    } catch {
      Alert.alert(
        REMINDER_STRINGS.alerts.cancelErrorTitle,
        REMINDER_STRINGS.alerts.cancelErrorMessage,
      );
    }
  };

  return {
    content,
    topic,
    time,
    setTime,
    showPicker,
    setShowPicker,
    selectedDays,
    toggleDay,
    scheduleReminder,
    cancelScheduled,
    closeReminderFlow,
    scheduledIds,
  };
};
