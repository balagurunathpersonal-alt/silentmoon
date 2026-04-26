import { appwriteService } from "@/services/appwrite-service";
import { useAuth } from "@/services/auth-context";
import { SecureStoreHandler } from "@/services/secureStoreHandler";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Linking,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useAppNavigationHandler } from "../navigation/app-navigation";
import type { RootStackParamList } from "../types/navigation";

const readParam = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

const getUrlParam = (url: string | null, name: string) => {
  if (!url) return undefined;

  try {
    const parsedUrl = new URL(url);
    const queryParam = parsedUrl.searchParams.get(name);
    if (queryParam) return queryParam;
    const hashParams = new URLSearchParams(parsedUrl.hash.replace(/^#/, ""));
    return hashParams.get(name) ?? undefined;
  } catch {
    return undefined;
  }
};

const waitForCurrentUser = async () => {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const currentUser = await appwriteService.getCurrentUser();

    if (currentUser) {
      return true;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return false;
};

export default function OAuthScreen() {
  const navigation = useAppNavigationHandler();
  const route = useRoute<RouteProp<RootStackParamList, "OAuth">>();
  const { refreshUser } = useAuth();
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);
  const { userId, secret, error } = route.params ?? {};
  const [message, setMessage] = useState("Finishing sign-in...");

  const finalizeOAuthLogin = useCallback(async () => {
    const currentUser = await appwriteService.getCurrentUser();

    if (!currentUser) {
      throw new Error("Unable to load the signed-in user.");
    }

    const username =
      currentUser.email || currentUser.name || currentUser.$id || "oauth-user";

    await SecureStoreHandler.setSession(
      username,
      undefined,
      new Date().toISOString(),
    );
    await refreshUser();
  }, [refreshUser]);

  useEffect(() => {
    const exchangeSecret = async () => {
      const initialUrl = await Linking.getInitialURL();
      const resolvedError =
        readParam(error) ??
        getUrlParam(callbackUrl, "error") ??
        getUrlParam(initialUrl, "error");
      const resolvedUserId =
        readParam(userId) ??
        getUrlParam(callbackUrl, "userId") ??
        getUrlParam(initialUrl, "userId");
      const resolvedSecret =
        readParam(secret) ??
        getUrlParam(callbackUrl, "secret") ??
        getUrlParam(initialUrl, "secret");

      if (resolvedError) {
        setMessage("OAuth login failed. Please try again.");
        return;
      }

      if (!resolvedUserId || !resolvedSecret) {
        const hasSession = await waitForCurrentUser();

        if (hasSession) {
          await finalizeOAuthLogin();
          setMessage("Sign-in complete. Redirecting...");
          navigation.replace("Welcome");
          return;
        }

        setMessage("Unable to complete sign-in. Please try again.");
        return;
      }

      try {
        await appwriteService.completeOAuthSession({
          userId: resolvedUserId,
          secret: resolvedSecret,
        });
        await finalizeOAuthLogin();
        setMessage("Sign-in complete. Redirecting...");
        navigation.replace("Welcome");
      } catch {
        setMessage("Unable to complete sign-in. Please try again.");
      }
    };

    // listen for linking events while this screen is mounted
    let removeListener: (() => void) | null = null;
    void (async () => {
      const initial = await Linking.getInitialURL();
      setCallbackUrl(initial);
      removeListener = Linking.addEventListener("url", (e) => {
        setCallbackUrl(e.url);
      }).remove;
      await exchangeSecret();
    })();

    return () => {
      if (removeListener) removeListener();
    };
  }, [callbackUrl, error, finalizeOAuthLogin, navigation, secret, userId]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 16,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#3F414E",
  },
});
