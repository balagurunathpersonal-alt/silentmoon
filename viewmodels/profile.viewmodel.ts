import { useState } from "react";
import { Alert } from "react-native";
import { PROFILE_STRINGS } from "../constants/profile-strings";
import { useAppNavigationHandler } from "../navigation/app-navigation";
import { useAuth } from "../services/auth-context";
import { useTheme } from "../themes/theme-context";

const getDisplayName = (name?: string, email?: string) => {
  const trimmedName = name?.trim();

  if (trimmedName) {
    return trimmedName;
  }

  return email?.split("@")[0] || PROFILE_STRINGS.defaults.name;
};

const getAvatarInitial = (name: string) => name.trim().charAt(0).toUpperCase();

export const useProfileViewModel = () => {
  const { theme } = useTheme();
  const navigation = useAppNavigationHandler();
  const { signout, user } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const name = getDisplayName(user?.name, user?.email);
  const email = user?.email || PROFILE_STRINGS.defaults.email;

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await signout();
    } finally {
      setIsSigningOut(false);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      PROFILE_STRINGS.alerts.logoutTitle,
      PROFILE_STRINGS.alerts.logoutMessage,
      [
        { style: "cancel", text: PROFILE_STRINGS.alerts.logoutCancel },
        {
          onPress: () => {
            void handleSignOut();
          },
          style: "destructive",
          text: PROFILE_STRINGS.alerts.logoutConfirm,
        },
      ],
    );
  };

  const openReminderTopics = () => {
    navigation.navigate("Topics", { reminderReturnTo: "Profile" });
  };

  return {
    theme,
    avatarInitial: getAvatarInitial(name),
    chooseReminderLabel: PROFILE_STRINGS.buttons.chooseReminder,
    isSigningOut,
    loggingOutLabel: PROFILE_STRINGS.buttons.loggingOut,
    logoutLabel: PROFILE_STRINGS.buttons.logout,
    name,
    onLogoutPress: confirmLogout,
    onReminderPress: openReminderTopics,
    reminderSubtitle: PROFILE_STRINGS.reminder.subtitle,
    reminderTitle: PROFILE_STRINGS.reminder.title,
    subtitle: email,
    sectionTitle: PROFILE_STRINGS.sectionTitle,
    settings: [
      { label: PROFILE_STRINGS.settings.name, value: name },
      { label: PROFILE_STRINGS.settings.email, value: email },
    ],
  };
};
