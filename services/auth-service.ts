import { APP_CONSTANTS } from "@/constants/app-constants";
import { OAuthProvider } from "react-native-appwrite";
import { appwriteService } from "./appwrite-service";
import { Logger } from "./logger";
import { AuthProvider, SecureStoreHandler } from "./secureStoreHandler";

export type AuthService = {
  continueWithFacebook: () => Promise<void>;
  continueWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  logoutCurrentSession: () => Promise<void>;
  logoutAllSessions: () => Promise<void>;
};

export const createAuthService = (logger: Logger): AuthService => {
  const persistSession = async (username: string, provider: AuthProvider) => {
    const saved = await SecureStoreHandler.setSession(
      username,
      provider,
      new Date().toISOString(),
    );

    if (!saved) {
      throw new Error("Failed to persist login credentials.");
    }
  };

  return {
    continueWithFacebook: async () => {
      try {
        await appwriteService.createOAuthSession({
          provider: OAuthProvider.Facebook,
        });
        const user = await appwriteService.getCurrentUser();
        const username = user?.email || user?.name || user?.$id || "facebook";
        await persistSession(username, "facebook");
        logger.info("Facebook login initiated successfully");
      } catch (error) {
        logger.error("Facebook login failed", error);
        throw error;
      }
    },

    continueWithGoogle: async () => {
      try {
        await appwriteService.createOAuthSession({
          provider: OAuthProvider.Google,
          scopes: ["email", "profile"],
        });
        const user = await appwriteService.getCurrentUser();
        const username = user?.email || user?.name || user?.$id || "google";
        await persistSession(username, "google");
        logger.info("Google login initiated successfully");
      } catch (error) {
        logger.error("Google login failed", error);
        throw error;
      }
    },

    loginWithEmail: async (email, password) => {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      try {
        await appwriteService.createEmailSession({ email, password });
        await persistSession(email, "email");
        logger.info(`Email login successful for ${email}`);
      } catch (error) {
        logger.error(`Email login failed for ${email}`, error);
        throw error;
      }
    },
    sendPasswordReset: async (email) => {
      if (!email) {
        logger.info("Forgot password pressed without email");
        return;
      }

      try {
        await appwriteService.createPasswordRecovery({
          email,
          redirectUrl: `${APP_CONSTANTS.scheme}://reset-password`,
        });
        logger.info(`Password recovery sent for ${email}`);
      } catch (error) {
        logger.error(`Password recovery failed for ${email}`, error);
        throw error;
      }
    },
    signUp: async (email, password, name) => {
      const trimmedName = name?.trim();

      if (!trimmedName || !email || !password) {
        throw new Error("Name, email, and password are required.");
      }

      try {
        await appwriteService.createAccount({
          email,
          password,
          name: trimmedName,
        });
        await appwriteService.createEmailSession({ email, password });
        await persistSession(email, "email");
        logger.info(`Account created for ${email}`);
      } catch (error) {
        logger.error(`Sign up failed for ${email}`, error);
        throw error;
      }
    },
    logoutCurrentSession: async () => {
      try {
        await appwriteService.deleteCurrentSession();
        const resetResult = await SecureStoreHandler.resetCredentials();
        if (!resetResult) {
          throw new Error("Failed to reset credentials");
        }
        logger.info("Current session deleted successfully");
      } catch (error) {
        logger.error("Deleting current session failed", error);
        throw error;
      }
    },
    logoutAllSessions: async () => {
      try {
        await appwriteService.deleteAllSessions();
        const resetResult = await SecureStoreHandler.resetCredentials();
        if (!resetResult) {
          throw new Error("Failed to reset credentials");
        }
        logger.info("All sessions deleted successfully");
      } catch (error) {
        logger.error("Deleting all sessions failed", error);
        throw error;
      }
    },
  };
};
