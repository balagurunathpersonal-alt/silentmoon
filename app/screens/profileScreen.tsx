import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/images/svg/logo.svg";
import { darkTheme, lightTheme } from "../../themes/themes";
import { useProfileViewModel } from "../../viewmodels/profile.viewmodel";

type Theme = typeof lightTheme | typeof darkTheme;

type SettingsRowProps = {
  isLast: boolean;
  label: string;
  value: string;
};

const SettingsRow = ({ isLast, label, value }: SettingsRowProps) => (
  <View
    style={[
      stylesBase.settingsRow,
      isLast ? stylesBase.settingsRowLast : undefined,
    ]}
  >
    <Text style={stylesBase.settingsLabel}>{label}</Text>
    <Text style={stylesBase.settingsValue}>{value}</Text>
  </View>
);

const ProfileScreen = () => {
  const {
    avatarInitial,
    isSigningOut,
    name,
    onLogoutPress,
    sectionTitle,
    settings,
    subtitle,
    theme,
  } = useProfileViewModel();
  const styleSheet = styles(theme);

  return (
    <SafeAreaView style={styleSheet.safeArea}>
      <ScrollView
        contentContainerStyle={styleSheet.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styleSheet.header}>
          <Logo width={168} height={30} />
        </View>

        <View style={styleSheet.profileHeader}>
          <View style={styleSheet.avatar}>
            <Text style={styleSheet.avatarText}>{avatarInitial}</Text>
          </View>
          <Text style={styleSheet.title}>{name}</Text>
          <Text style={styleSheet.subtitle}>{subtitle}</Text>
        </View>

        <View style={styleSheet.sectionHeader}>
          <Text style={styleSheet.sectionTitle}>{sectionTitle}</Text>
        </View>

        <View style={styleSheet.settingsCard}>
          {settings.map((item, index) => (
            <SettingsRow
              key={item.label}
              isLast={index === settings.length - 1}
              {...item}
            />
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.82}
          disabled={isSigningOut}
          onPress={onLogoutPress}
          style={[
            styleSheet.logoutButton,
            isSigningOut ? styleSheet.logoutButtonDisabled : undefined,
          ]}
        >
          <Text style={styleSheet.logoutButtonText}>
            {isSigningOut ? "Logging out..." : "Log out"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const stylesBase = StyleSheet.create({
  settingsLabel: {
    color: "#3F414E",
    fontSize: 16,
    fontWeight: "600",
  },
  settingsRow: {
    alignItems: "center",
    borderBottomColor: "#EBEAEC",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  settingsRowLast: {
    borderBottomWidth: 0,
  },
  settingsValue: {
    color: "#A1A4B2",
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 16,
    textAlign: "right",
  },
});

const styles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: theme.background,
      flex: 1,
    },
    scrollContainer: {
      paddingBottom: 32,
      paddingHorizontal: 20,
      paddingTop: 18,
    },
    header: {
      alignItems: "center",
      marginBottom: 36,
    },
    profileHeader: {
      alignItems: "center",
      marginBottom: 24,
    },
    avatar: {
      alignItems: "center",
      backgroundColor: "#8E97FD",
      borderRadius: 44,
      height: 88,
      justifyContent: "center",
      marginBottom: 16,
      width: 88,
    },
    avatarText: {
      color: "#FFFFFF",
      fontSize: 34,
      fontWeight: "700",
    },
    title: {
      color: theme.primaryTextColor,
      fontSize: 28,
      fontWeight: "700",
    },
    subtitle: {
      color: theme.secondaryTextColor,
      fontSize: 16,
      marginTop: 8,
    },
    sectionHeader: {
      marginBottom: 16,
    },
    sectionTitle: {
      color: theme.primaryTextColor,
      fontSize: 22,
      fontWeight: "700",
    },
    settingsCard: {
      backgroundColor: "#FFFFFF",
      borderColor: "#EBEAEC",
      borderRadius: 12,
      borderWidth: 1,
      overflow: "hidden",
    },
    logoutButton: {
      alignItems: "center",
      backgroundColor: "#F85F6A",
      borderRadius: 12,
      marginTop: 24,
      paddingHorizontal: 18,
      paddingVertical: 16,
    },
    logoutButtonDisabled: {
      opacity: 0.62,
    },
    logoutButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },
  });

export default ProfileScreen;
