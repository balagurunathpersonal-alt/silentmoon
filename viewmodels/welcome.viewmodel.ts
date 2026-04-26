import { useTheme } from "@/themes/theme-context";
import { useAppNavigationHandler } from "../navigation/app-navigation";
import { useAuth } from "../services/auth-context";

export const useWelcomeViewModel = () => {
  const navigation = useAppNavigationHandler();
  const { theme } = useTheme();
  const { user } = useAuth();

  const displayName =
    user?.name?.trim() || user?.email?.split("@")[0] || "there";

  const handleGetStarted = () => {
    navigation.navigate("Topics");
  };

  return {
    theme,
    displayName,
    welcomeTitle: `Hi ${displayName}, Welcome to Silent Moon`,
    welcomeSubtitle:
      "Explore the app, Find some peace of mind to prepare for meditation.",
    ctaLabel: "GET STARTED",
    handleGetStarted,
  };
};
