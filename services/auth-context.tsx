//import { setCredentials } from "@/lib/keychainHandler";
import { appwriteService } from "@/services/appwrite-service";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { ID, Models } from "react-native-appwrite";
import { SecureStoreHandler } from "./secureStoreHandler";

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoadingUser: boolean;
  refreshUser: () => Promise<void>;
  signup: (email: string, password: string) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  signout: () => Promise<void>;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    void refreshUser();
  }, []);

  const refreshUser = async () => {
    setIsLoadingUser(true);
    const creds = await SecureStoreHandler.getSession();
    if (creds && creds.username.length > 0) {
      await fetchUserData();
    } else {
      setUser(null);
      setIsLoadingUser(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await appwriteService.account.get();
      console.debug(
        "AuthProvider: authenticated user fetched:",
        userData.email || userData.$id,
      );
      setUser(userData);
      return;
    } catch (error) {
      console.error("AuthProvider: error fetching user data:", error);
      setUser(null);
      return;
    } finally {
      setIsLoadingUser(false);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      await appwriteService.account.create({
        userId: ID.unique(),
        email,
        password,
      });
      const loginError = await login(email, password);
      if (loginError) {
        return loginError;
      }
      const userData = await appwriteService.account.get();
      console.log("Fetched user data:", userData);
      setUser(userData);
      const saved = await SecureStoreHandler.setCredentials(email, password);
      console.log("Saved:", saved);
      // const result = await setCredentials(email, password);

      // if (result.success) {
      //   console.log("✅ Credentials saved securely");
      // } else {
      //   console.log("❌ Error:", result.error);
      // }
      return null;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Signup error:", error);
        return error.message;
      }
      return "An unknown error occurred during signup.";
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await appwriteService.account.createEmailPasswordSession({
        email,
        password,
      });
      const userData = await appwriteService.account.get();
      console.log("Fetched user data:", userData);
      setUser(userData);
      const saved = await SecureStoreHandler.setCredentials(email, password);
      console.log("Saved:", saved);

      // Save credentials for future app launches
      // const result = await setCredentials(email, password);
      // if (result.success) {
      //   console.log("✅ Credentials saved securely");
      // } else {
      //   console.log("❌ Error saving credentials:", result.error);
      // }

      return null;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login error:", error);
        return error.message;
      }
      return "An unknown error occurred during login.";
    }
  };

  const signout = async () => {
    try {
      await appwriteService.account.deleteSession({ sessionId: "current" });
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Logout failed", "Please try again.");
    } finally {
      const result = await SecureStoreHandler.resetCredentials();
      console.log("Credentials reset:", result);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoadingUser, user, refreshUser, signup, login, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
