import { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "../services/auth-context";
import { useTheme } from "../themes/theme-context";

const getDisplayName = (name?: string, email?: string) => {
  const trimmedName = name?.trim();

  if (trimmedName) {
    return trimmedName;
  }

  return email?.split("@")[0] || "Meditator";
};

const getAvatarInitial = (name: string) => name.trim().charAt(0).toUpperCase();

export const useProfileViewModel = () => {
  const { theme } = useTheme();
  const { signout, user } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const name = getDisplayName(user?.name, user?.email);
  const email = user?.email || "No email added";

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await signout();
    } finally {
      setIsSigningOut(false);
    }
  };

  const confirmLogout = () => {
    Alert.alert("Log out", "You will need to sign in again to continue.", [
      { style: "cancel", text: "Cancel" },
      {
        onPress: () => {
          void handleSignOut();
        },
        style: "destructive",
        text: "Log out",
      },
    ]);
  };

  return {
    theme,
    avatarInitial: getAvatarInitial(name),
    isSigningOut,
    name,
    onLogoutPress: confirmLogout,
    subtitle: email,
    sectionTitle: "Profile Details",
    settings: [
      { label: "Name", value: name },
      { label: "Email", value: email },
    ],
  };
};
