import { useTheme } from "@/themes/theme-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDependencies } from "../di/dependency-context";
import { useAppNavigationHandler } from "../navigation/app-navigation";
import { useAuth } from "../services/auth-context";
import type { RootStackParamList } from "../types/navigation";

type FeedbackState = {
  kind: "success" | "error" | "info";
  message: string;
};

export const useSignInViewModel = () => {
  const { theme } = useTheme();
  const navigation = useAppNavigationHandler();
  const route = useRoute<RouteProp<RootStackParamList, "SignIn">>();
  const mode = route.params?.mode;
  const { authService, logger } = useDependencies();
  const { refreshUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signin, setSignin] = useState(mode !== "signup");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  useEffect(() => {
    setSignin(mode !== "signup");
  }, [mode]);

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error && error.message) {
      return error.message;
    }

    return "Something went wrong. Please try again.";
  };

  const handleBack = () => {
    navigation.backOrReplace("Landing");
  };

  const handleFacebookLogin = async () => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      await authService.continueWithFacebook();
      await refreshUser();
      setFeedback({
        kind: "success",
        message: "Facebook login completed successfully.",
      });
      navigation.replace("Welcome");
    } catch (error) {
      setFeedback({ kind: "error", message: getErrorMessage(error) });
      logger.error("Facebook login action failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      await authService.continueWithGoogle();
      await refreshUser();
      setFeedback({
        kind: "success",
        message: "Google login completed successfully.",
      });
      navigation.replace("Welcome");
    } catch (error) {
      setFeedback({ kind: "error", message: getErrorMessage(error) });
      logger.error("Google login action failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (feedback) {
      setFeedback(null);
    }
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (feedback) {
      setFeedback(null);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (feedback) {
      setFeedback(null);
    }
  };

  const handleEmailLogin = async () => {
    if (!signin) {
      await handleSignUp();
    } else {
      setIsSubmitting(true);
      setFeedback(null);
      try {
        await authService.loginWithEmail(email, password);
        await refreshUser();
        setFeedback({ kind: "success", message: "Logged in successfully." });
        navigation.replace("Welcome");
      } catch (error) {
        setFeedback({ kind: "error", message: getErrorMessage(error) });
        logger.error("Email login action failed", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleForgotPassword = async () => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      await authService.sendPasswordReset(email);
      setFeedback({
        kind: "success",
        message: "Password reset instructions sent to your email.",
      });
    } catch (error) {
      setFeedback({ kind: "error", message: getErrorMessage(error) });
      logger.error("Password reset action failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async () => {
    const trimmedName =
      name.trim().charAt(0).toUpperCase() + name.trim().slice(1);

    if (!trimmedName) {
      setFeedback({ kind: "error", message: "Name is required." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await authService.signUp(email, password, trimmedName);
      await refreshUser();
      setFeedback({
        kind: "success",
        message: "Account created successfully.",
      });
    } catch (error) {
      setFeedback({ kind: "error", message: getErrorMessage(error) });
      logger.error("Sign up action failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSignUp = async () => {
    setSignin(!signin);
  };

  return {
    theme,
    name,
    email,
    password,
    signin,
    isSubmitting,
    feedback,
    handleBack,
    handleFacebookLogin,
    handleGoogleLogin,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleEmailLogin,
    handleForgotPassword,
    handleSignUp: toggleSignUp,
  };
};
