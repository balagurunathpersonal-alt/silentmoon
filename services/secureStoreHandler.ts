// secureStoreHandler.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from "react-native-keychain";

export type AuthProvider = "email" | "google" | "facebook";

export interface StoredAuthSession {
  username: string;
  provider?: AuthProvider;
  loggedInAt?: string;
  secret?: string;
}

export class SecureStoreHandler {
  private static usernameKey = "app_username";
  private static secretKey = "app_secret";
  private static providerKey = "app_provider";
  private static loggedInAtKey = "app_logged_in_at";

  static async setSession(
    username: string,
    provider?: AuthProvider,
    loggedInAt?: string,
    secret?: string,
  ): Promise<boolean> {
    try {
      await AsyncStorage.setItem(this.usernameKey, username);

      if (provider) {
        await AsyncStorage.setItem(this.providerKey, provider);
      } else {
        await AsyncStorage.removeItem(this.providerKey);
      }

      if (loggedInAt) {
        await AsyncStorage.setItem(this.loggedInAtKey, loggedInAt);
      } else {
        await AsyncStorage.removeItem(this.loggedInAtKey);
      }

      if (secret) {
        await Keychain.setGenericPassword(username, secret, {
          service: this.secretKey,
        });
      } else {
        await Keychain.resetGenericPassword({ service: this.secretKey });
      }

      return true;
    } catch (error) {
      console.error("Error saving credentials:", error);
      return false;
    }
  }

  static async getSession(): Promise<StoredAuthSession | null> {
    try {
      const username = await AsyncStorage.getItem(this.usernameKey);
      const provider = await AsyncStorage.getItem(this.providerKey);
      const loggedInAt = await AsyncStorage.getItem(this.loggedInAtKey);

      const creds = await Keychain.getGenericPassword({
        service: this.secretKey,
      });
      const secret = creds ? creds.password : undefined;

      if (username) {
        return {
          username,
          provider: provider as AuthProvider | undefined,
          loggedInAt: loggedInAt ?? undefined,
          secret: secret ?? undefined,
        };
      }
      return null;
    } catch (error) {
      console.error("Error retrieving credentials:", error);
      return null;
    }
  }

  static async clearSession(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(this.usernameKey);
      await AsyncStorage.removeItem(this.providerKey);
      await AsyncStorage.removeItem(this.loggedInAtKey);
      await Keychain.resetGenericPassword({ service: this.secretKey });
      return true;
    } catch (error) {
      console.error("Error resetting credentials:", error);
      return false;
    }
  }

  // Backward-compatible aliases while the rest of the auth flow catches up.
  static async setCredentials(
    username: string,
    secret: string,
    provider?: AuthProvider,
    loggedInAt?: string,
  ): Promise<boolean> {
    return this.setSession(username, provider, loggedInAt, secret);
  }

  static async getCredentials(): Promise<StoredAuthSession | null> {
    return this.getSession();
  }

  static async resetCredentials(): Promise<boolean> {
    return this.clearSession();
  }
}
