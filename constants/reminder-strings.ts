export type ReminderContent = {
  daySubtitle: string;
  dayTitle: string;
  notificationMessage: string;
  notificationTitle: string;
  timeSubtitle: string;
  timeTitle: string;
};

export const REMINDER_STRINGS = {
  alerts: {
    canceledTitle: "Canceled",
    canceledMessage: "All scheduled reminders canceled.",
    cancelErrorTitle: "Error",
    cancelErrorMessage: "Failed to cancel reminders",
    notificationBlockedMessage:
      "Android may be blocking exact alarms for Silent Moon. Please enable Alarms & reminders for the app in Android settings and try again.",
    notificationBlockedTitle: "Reminder could not be scheduled",
    notificationsOffMessage:
      "Please allow notifications to receive meditation reminders.",
    notificationsOffTitle: "Notifications are off",
    reminderSavedTitle: "Reminder saved successfully!",
    selectDayTitle: "Please select at least one day",
  },
  buttons: {
    noThanks: "NO THANKS",
    save: "SAVE",
  },
  days: ["SU", "M", "T", "W", "TH", "F", "S"],
  defaultTopic: "meditation",
  labels: {
    backAccessibility: "Go back",
    topicPrefix: "Reminder for",
  },
  nextReminderPrefix: "Next reminder:",
} as const;

export const DEFAULT_REMINDER_CONTENT: ReminderContent = {
  daySubtitle: "Everyday is best, but we recommend picking at least five.",
  dayTitle: "Which day would you like to meditate?",
  notificationMessage: "Take a few minutes to pause, breathe, and reset.",
  notificationTitle: "Meditation reminder",
  timeSubtitle:
    "Any time you can choose but We recommend first thing in the morning.",
  timeTitle: "What time would you like to meditate?",
};

export const TOPIC_REMINDER_CONTENT: Record<string, ReminderContent> = {
  "better sleep": {
    daySubtitle: "Choose nights when a calm wind-down will help you rest.",
    dayTitle: "Which day would you like to sleep better?",
    notificationMessage: "Ease into rest with a quiet Better Sleep meditation.",
    notificationTitle: "Time to prepare for better sleep",
    timeSubtitle:
      "Evening reminders work well for settling your body and mind.",
    timeTitle: "What time would you like to wind down?",
  },
  "calm mind": {
    daySubtitle: "Pick the days when you want a steady moment of calm.",
    dayTitle: "Which day would you like to calm your mind?",
    notificationMessage: "Step away for a Calm Mind meditation.",
    notificationTitle: "Time to calm your mind",
    timeSubtitle: "A regular pause can make calm easier to return to.",
    timeTitle: "What time would you like a calm reminder?",
  },
  confidence: {
    daySubtitle: "Pick the days when a confident reset would support you.",
    dayTitle: "Which day would you like to build confidence?",
    notificationMessage: "Take a few minutes to reconnect with confidence.",
    notificationTitle: "Time to build confidence",
    timeSubtitle: "Choose a time before your day asks for your best energy.",
    timeTitle: "What time would you like a confidence reminder?",
  },
  energy: {
    daySubtitle: "Choose the days when you want a brighter reset.",
    dayTitle: "Which day would you like more energy?",
    notificationMessage: "Refresh your mind with a short Energy meditation.",
    notificationTitle: "Time to recharge your energy",
    timeSubtitle: "Morning or midday reminders are great for restoring energy.",
    timeTitle: "What time would you like to recharge?",
  },
  focus: {
    daySubtitle: "Pick the days when deep focus matters most.",
    dayTitle: "Which day would you like to focus?",
    notificationMessage: "Clear distractions with a short Focus meditation.",
    notificationTitle: "Time to sharpen your focus",
    timeSubtitle: "Schedule this before work, study, or any deep-focus block.",
    timeTitle: "What time would you like to focus?",
  },
  "improve performance": {
    daySubtitle: "Choose the days when you want to show up with clarity.",
    dayTitle: "Which day would you like to improve performance?",
    notificationMessage:
      "Reset your attention with an Improve Performance meditation.",
    notificationTitle: "Time to improve performance",
    timeSubtitle: "Pick a time before practice, work, or your key routine.",
    timeTitle: "What time would you like to prepare?",
  },
  "increase happiness": {
    daySubtitle: "Pick the days when you want to make room for joy.",
    dayTitle: "Which day would you like to increase happiness?",
    notificationMessage: "Pause for an Increase Happiness meditation.",
    notificationTitle: "Time to nurture happiness",
    timeSubtitle: "Choose a time when a grateful reset will feel natural.",
    timeTitle: "What time would you like a happiness reminder?",
  },
  meditation: DEFAULT_REMINDER_CONTENT,
  "personal growth": {
    daySubtitle: "Choose the days when you want to invest in yourself.",
    dayTitle: "Which day would you like to grow?",
    notificationMessage:
      "Take a mindful step in your Personal Growth practice.",
    notificationTitle: "Time for personal growth",
    timeSubtitle: "A consistent reminder can turn reflection into a habit.",
    timeTitle: "What time would you like to reflect?",
  },
  "reduce anxiety": {
    daySubtitle: "Pick the days when a grounding pause would help.",
    dayTitle: "Which day would you like to reduce anxiety?",
    notificationMessage: "Ground yourself with a Reduce Anxiety meditation.",
    notificationTitle: "Time to ease anxiety",
    timeSubtitle: "Choose a time when you can slow down without rushing.",
    timeTitle: "What time would you like a grounding reminder?",
  },
  "reduce stress": {
    daySubtitle: "Choose the days when a stress reset would support you.",
    dayTitle: "Which day would you like to reduce stress?",
    notificationMessage: "Release tension with a Reduce Stress meditation.",
    notificationTitle: "Time to reduce stress",
    timeSubtitle: "First thing in the morning or after work are both great.",
    timeTitle: "What time would you like to reduce stress?",
  },
  relaxation: {
    daySubtitle: "Pick the days when your body and mind need softer space.",
    dayTitle: "Which day would you like to relax?",
    notificationMessage: "Settle in with a Relaxation meditation.",
    notificationTitle: "Time to relax",
    timeSubtitle: "Choose a time when you can fully let your shoulders drop.",
    timeTitle: "What time would you like to relax?",
  },
};

export const getCustomReminderContent = (
  topic: string,
): ReminderContent => ({
  ...DEFAULT_REMINDER_CONTENT,
  notificationMessage: `Take a few minutes for your ${topic} practice.`,
  notificationTitle: `Time for ${topic}`,
  timeSubtitle: `Set a gentle reminder for your ${topic} practice.`,
  timeTitle: `What time would you like to practice ${topic}?`,
});
