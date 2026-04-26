import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoWhite from "../../assets/images/svg/logo-white.svg";
import Meditate from "../../assets/images/svg/meditate.svg";
import BackgroundPattern from "../../assets/images/svg/welcome.svg";
import { darkTheme, lightTheme } from "../../themes/themes";
import { useWelcomeViewModel } from "../../viewmodels/welcome.viewmodel";

type Theme = typeof lightTheme | typeof darkTheme;

const WelcomeScreen = () => {
  const { theme, welcomeTitle, welcomeSubtitle, ctaLabel, handleGetStarted } =
    useWelcomeViewModel();
  const styleSheet = styles(theme);

  return (
    <SafeAreaView style={styleSheet.safeArea}>
      <View style={styleSheet.container}>
        {/* Background SVG pattern */}
        <View style={styleSheet.background}>
          <BackgroundPattern width="100%" height="100%" />
        </View>
        {/* Logo and App Name */}
        <View style={styleSheet.header}>
          <LogoWhite width={168} height={30} />
        </View>

        {/* Welcome Text */}
        <View style={styleSheet.textContainer}>
          <Text style={styleSheet.welcome}>{welcomeTitle}</Text>
          <Text style={styleSheet.subtitle}>{welcomeSubtitle}</Text>
        </View>

        {/* Illustration */}
        <Meditate />

        {/* Get Started Button */}
        <TouchableOpacity style={styleSheet.button} onPress={handleGetStarted}>
          <Text style={styleSheet.buttonText}>{ctaLabel}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.buttonColor,
    },
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.buttonColor,
    },
    background: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: "center",
    },
    header: {
      alignItems: "center",
      marginTop: 20,
    },
    logo: {
      width: 60,
      height: 60,
      marginBottom: 10,
      resizeMode: "contain",
    },
    appName: {
      fontSize: 22,
      fontWeight: "600",
      color: theme.text,
    },
    textContainer: {
      paddingHorizontal: 30,
      alignItems: "center",
      marginTop: 20,
    },
    welcome: {
      fontSize: 20,
      fontWeight: "700",
      color: "#fff",
      textAlign: "center",
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: theme.textBoxStrokeColor,
      textAlign: "center",
    },
    illustration: {
      width: 220,
      height: 220,
      resizeMode: "contain",
      marginVertical: 30,
    },
    button: {
      backgroundColor: theme.textBoxStrokeColor,
      paddingVertical: 15,
      paddingHorizontal: 60,
      borderRadius: 30,
      marginBottom: 40,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.buttonColor,
    },
  });

export default WelcomeScreen;
