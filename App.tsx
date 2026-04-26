import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ReactNode, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoadingScreen from "./app/components/LoadingScreen";
import OAuthScreen from "./app/oauth";
import CourseDetailScreen from "./app/screens/course-detail";
import MainTabs from "./app/screens/maintabs";
import ReminderScreen from "./app/screens/reminder";
import SignInScreen from "./app/screens/signin";
import SignInSignupScreen from "./app/screens/signupsignIn";
import TopicsScreen from "./app/screens/topics";
import WelcomeScreen from "./app/screens/welcome";
import { DependencyProvider } from "./di/dependency-context";
import { appNavigation, appNavigationRef } from "./navigation/app-navigation";
import { AuthProvider, useAuth } from "./services/auth-context";
import { ThemeProvider } from "./themes/theme-context";
import type { RootStackParamList } from "./types/navigation";

const Stack = createStackNavigator<RootStackParamList>();

const PUBLIC_ROUTES = new Set<string>(["Landing", "OAuth", "SignIn"]);
const PROTECTED_ROUTES = new Set<string>([
  "Welcome",
  "Topics",
  "Reminder",
  "MainTabs",
  "Home",
  "Sleep",
  "Meditate",
  "Music",
  "Profile",
  "CourseDetail",
]);

const linking = {
  prefixes: ["appwrite-callback-69ead33e003129ed4fea://"],
  config: {
    screens: {
      Landing: "",
      OAuth: "oauth",
      SignIn: "signin",
      Welcome: "welcome",
      Topics: "topics",
      Reminder: "reminder",
      MainTabs: "main",
      CourseDetail: "course-detail",
    },
  },
};

function RootNavigator() {
  const { user, isLoadingUser } = useAuth();
  const [currentRouteName, setCurrentRouteName] = useState("Landing");

  useEffect(() => {
    if (!appNavigationRef.isReady() || isLoadingUser) {
      return;
    }

    const isPublicRoute = PUBLIC_ROUTES.has(currentRouteName);
    const isProtectedRoute = PROTECTED_ROUTES.has(currentRouteName);

    if (
      user &&
      (currentRouteName === "Landing" || currentRouteName === "SignIn")
    ) {
      appNavigation.resetTo("Welcome");
      return;
    }

    if (!user && isProtectedRoute) {
      appNavigation.resetTo("Landing");
      return;
    }

    if (user && !isPublicRoute && !isProtectedRoute) {
      appNavigation.resetTo("Welcome");
    }
  }, [currentRouteName, isLoadingUser, user]);

  if (isLoadingUser) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer
      linking={linking}
      ref={appNavigationRef}
      onReady={() => {
        setCurrentRouteName(appNavigation.getCurrentRouteName() ?? "Landing");
      }}
      onStateChange={() => {
        setCurrentRouteName(appNavigation.getCurrentRouteName() ?? "Landing");
      }}
      fallback={<LoadingScreen />}
    >
      <Stack.Navigator
        initialRouteName={user ? "Welcome" : "Landing"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Landing" component={SignInSignupScreen} />
        <Stack.Screen name="OAuth" component={OAuthScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Topics" component={TopicsScreen} />
        <Stack.Screen name="Reminder" component={ReminderScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <DependencyProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <AuthProvider>{children}</AuthProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </DependencyProvider>
  );
}

export default function App() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
