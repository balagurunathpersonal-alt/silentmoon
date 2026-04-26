import { FeatherIconName, MainTabName } from "./tab.types";

export const useMainTabsViewModel = () => {
  const tabIcons: Record<MainTabName, FeatherIconName> = {
    Home: "home",
    Sleep: "moon",
    Meditate: "sun",
    Music: "music",
    Profile: "user",
  };

  return {
    activeBackgroundColor: "#999fed",
    activeIconColor: "#FFFFFF",
    activeTintColor: "#8E97FD",
    inactiveTintColor: "#A1A4B2",
    tabIcons,
  };
};
