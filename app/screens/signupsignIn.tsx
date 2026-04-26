import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Logo from "../../assets/images/svg/logo.svg";
import BackgroundPattern from "../../assets/images/svg/welcomebgpattern.svg";
import { darkTheme, lightTheme } from "../../themes/themes";
import { useSignInSignUpViewModel } from "../../viewmodels/signupsignin.viewmodel";

type Theme = typeof lightTheme | typeof darkTheme;

const SignInSignupScreen = () => {
  const { theme, width, height, handleSignUp, handleLogin } =
    useSignInSignUpViewModel();
  const styleSheet = styles(theme);

  return (
    <ScrollView contentContainerStyle={styleSheet.welcomeScrollView}>
      {/* Root container with main layout */}
      <View style={styleSheet.container}>
        {/* Image section - top 55% of screen */}
        <View
          style={[
            styleSheet.welcomeImageContainer,
            { height: height * 0.55, width: width },
          ]}
        >
          {/* Background SVG pattern */}
          <View style={styleSheet.background}>
            <BackgroundPattern />
          </View>

          {/* App logo */}
          <View style={styleSheet.logoContainer}>
            <Logo width={168} height={30} />
          </View>
        </View>

        {/* Text and button section - bottom 45% of screen */}
        <View
          style={[styleSheet.textButtonContainer, { height: height * 0.45 }]}
        >
          {/* Title and subtitle text container */}
          <View style={styleSheet.textContainer}>
            <Text style={styleSheet.title}>We are what we do</Text>
            <Text style={styleSheet.subtitle}>
              Thousands of people are using Silent Moon for small meditations
            </Text>
          </View>

          {/* Sign up button container */}
          <View style={styleSheet.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSignUp}
              style={styleSheet.button}
            >
              SIGN UP
            </Button>
          </View>
          {/* Login button container */}
          <View style={styleSheet.loginButtonContainer}>
            <Text>Already have an account?</Text>
            <Button
              labelStyle={{ color: "#8E97FD" }}
              mode="text"
              onPress={handleLogin}
            >
              Log in
            </Button>
            {/* <Text>LOG IN</Text> */}
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignInSignupScreen;

const styles = (appTheme: Theme) =>
  StyleSheet.create({
    welcomeScrollView: {
      flex: 1,
      alignItems: "center",
    },
    container: {
      flex: 1,
      // backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundPosition: "top",
    },
    welcomeImageContainer: {
      flexDirection: "column",
      width: "100%",
    },
    background: {
      ...StyleSheet.absoluteFillObject,
      // width: "100%",
      // height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    logoContainer: {
      backgroundPosition: "center",
      alignItems: "center",
      // alignContent: "top",
      // justifyContent: "top",
      marginTop: 30,
    },
    textButtonContainer: {
      flexDirection: "column",
      // alignItems: "top",
      // justifyContent: "top",
    },
    textContainer: {},
    title: {
      fontSize: 28,
      fontWeight: "bold",
      // marginTop: 20,
      color: appTheme.primaryTextColor, //"#3F414E",
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: appTheme.secondaryTextColor, //"#A1A4B2",
      marginTop: 10,
      alignItems: "center",
      textAlign: "center",
    },
    buttonContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-end",
      paddingLeft: 20,
      paddingRight: 20,
    },
    button: {
      backgroundColor: appTheme.buttonColor,
      // paddingVertical: 15,
      // paddingHorizontal: 40,
      // borderRadius: 30,
      // marginBottom: 60,
    },
    buttonText: {
      color: appTheme.buttonColor, //"#8E97FD",
      fontSize: 18,
      fontWeight: "600",
      fontStyle: "normal",
      textAlign: "center",
      textTransform: "uppercase",
    },
    loginButtonContainer: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "flex-start",
      width: "100%",
    },
  });
