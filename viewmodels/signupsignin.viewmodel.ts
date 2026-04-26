import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { useAppNavigationHandler } from "../navigation/app-navigation";
import { useTheme } from "../themes/theme-context";
import type { AuthMode } from "../types/navigation";

export const useSignInSignUpViewModel = () => {
  const navigation = useAppNavigationHandler();
  const { theme } = useTheme();
  const { width, height } = useWindowDimensions();
  const [authMode, setAuthMode] = useState<AuthMode>("signup");

  const navigateToSignIn = (mode: AuthMode) => {
    setAuthMode(mode);
    navigation.navigate("SignIn", { mode });
  };

  const handleSignUp = () => {
    navigateToSignIn("signup");
  };

  const handleLogin = () => {
    navigateToSignIn("signin");
  };

  return {
    theme,
    width,
    height,
    authMode,
    signin: authMode === "signin",
    handleSignUp,
    handleLogin,
  };
};
