import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useMainTabsViewModel } from "../../viewmodels/main-tabs.viewmodel";
import { MainTabName } from "../../viewmodels/tab.types";
import HomeScreen from "./home";
import MeditateScreen from "./meditateScreen";
import MusicScreen from "./musicScreen";
import ProfileScreen from "./profileScreen";
import SleepScreen from "./sleep";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const {
    activeBackgroundColor,
    activeIconColor,
    activeTintColor,
    inactiveTintColor,
    tabIcons,
  } = useMainTabsViewModel();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarItemStyle: {
          marginHorizontal: 4,
          paddingVertical: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginTop: 2,
        },
        tabBarIcon: ({ color, focused, size }) => {
          const iconName = tabIcons[route.name as MainTabName] ?? "circle";

          return (
            <View
              style={[
                styles.iconCircle,
                focused && { backgroundColor: activeBackgroundColor },
              ]}
            >
              <Feather
                name={iconName}
                size={size}
                color={focused ? activeIconColor : color}
              />
            </View>
          );
        },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          elevation: 5,
          height: 70,
          paddingBottom: 6,
          paddingHorizontal: 8,
          paddingTop: 6,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Sleep" component={SleepScreen} />
      <Tab.Screen name="Meditate" component={MeditateScreen} />
      <Tab.Screen name="Music" component={MusicScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconCircle: {
    alignItems: "center",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    marginBottom: 5,
    width: 40,
  },
});
