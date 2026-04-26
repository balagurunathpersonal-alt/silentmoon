import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FacebookSignInImage from "../../assets/images/svg/facebookSignIn.svg";
import GoogleSignInImage from "../../assets/images/svg/googleSignIn.svg";
import LoginBG from "../../assets/images/svg/loginBG.svg";
import { darkTheme, lightTheme } from "../../themes/themes";
import { useSignInViewModel } from "../../viewmodels/signin.viewmodel";
import SilentMoonButton from "../components/LinkButton";

type Theme = typeof lightTheme | typeof darkTheme;
const SignInScreen: React.FC = () => {
  const {
    theme,
    name,
    email,
    password,
    signin,
    isSubmitting,
    feedback,
    handleFacebookLogin,
    handleGoogleLogin,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleEmailLogin,
    handleForgotPassword,
    handleSignUp,
  } = useSignInViewModel();
  const styleSheet = styles(theme);

  return (
    <SafeAreaView style={styleSheet.safeArea}>
      <View style={styleSheet.container}>
        <LoginBG style={styleSheet.background}></LoginBG>
        {/* Welcome Text */}
        <Text style={styleSheet.title}>
          {signin ? "Welcome Back!" : "Create your account!"}
        </Text>

        {/* Facebook Button */}
        <TouchableOpacity
          disabled={isSubmitting}
          style={styleSheet.facebookButton}
          onPress={handleFacebookLogin}
        >
          <FacebookSignInImage />
        </TouchableOpacity>

        {/* Google Button (Transparent Background + White Border) */}
        <TouchableOpacity
          disabled={isSubmitting}
          style={styleSheet.googleButton}
          onPress={handleGoogleLogin}
        >
          <GoogleSignInImage />
        </TouchableOpacity>

        {/* Divider */}
        <Text style={styleSheet.orText}>
          {signin ? "OR SIGN IN WITH EMAIL" : "OR SIGN UP WITH EMAIL"}
        </Text>

        {!signin ? (
          <TextInput
            autoCapitalize="words"
            editable={!isSubmitting}
            onChangeText={handleNameChange}
            placeholder="Name"
            style={styleSheet.input}
            value={name}
          />
        ) : null}

        {/* Email Input */}
        <TextInput
          autoCapitalize="none"
          editable={!isSubmitting}
          keyboardType="email-address"
          onChangeText={handleEmailChange}
          placeholder="Email address"
          style={styleSheet.input}
          value={email}
        />

        {/* Password Input */}
        <TextInput
          editable={!isSubmitting}
          onChangeText={handlePasswordChange}
          placeholder="Password"
          secureTextEntry
          style={styleSheet.input}
          value={password}
        />

        {feedback ? (
          <View
            style={[
              styleSheet.feedbackContainer,
              feedback.kind === "error"
                ? styleSheet.errorFeedback
                : styleSheet.successFeedback,
            ]}
          >
            <Text style={styleSheet.feedbackText}>{feedback.message}</Text>
          </View>
        ) : null}

        {/* Login Button */}
        <TouchableOpacity
          disabled={isSubmitting}
          style={styleSheet.loginButton}
          onPress={handleEmailLogin}
        >
          <Text style={styleSheet.loginText}>
            {isSubmitting ? "PLEASE WAIT..." : signin ? "SIGN IN" : "SIGN UP"}
          </Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity
          disabled={isSubmitting}
          onPress={handleForgotPassword}
        >
          <Text style={styleSheet.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        {/* Sign Up */}
        <View style={styleSheet.signupContainer}>
          <Text style={styleSheet.signupText}>
            {signin ? "DON'T HAVE AN ACCOUNT? " : "ALREADY HAVE AN ACCOUNT? "}
          </Text>
          <SilentMoonButton
            disabled={isSubmitting}
            onPress={handleSignUp}
            textStyle={styleSheet.signupButton}
          >
            {signin ? "SIGN UP" : "SIGN IN"}
          </SilentMoonButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = (appTheme: Theme) =>
  StyleSheet.create({
    safeArea: { flex: 1, justifyContent: "center", alignItems: "center" },
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: appTheme.background, // Dark background so white border is visible
    },
    background: {
      ...StyleSheet.absoluteFillObject,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      marginTop: 38,
      color: "#000",
    },
    facebookButton: {
      alignItems: "center",
      marginBottom: 16,
    },
    googleButton: {
      alignItems: "center",
      marginBottom: 25,
    },
    orText: {
      textAlign: "center",
      color: appTheme.secondaryTextColor,
      marginBottom: 25,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: appTheme.secondaryTextColor,
      borderRadius: 15,
      padding: 12,
      marginBottom: 12,
      color: appTheme.primaryTextColor,
      backgroundColor: appTheme.textBoxStrokeColor,
    },
    feedbackContainer: {
      borderRadius: 14,
      marginTop: 4,
      marginBottom: 8,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    successFeedback: {
      backgroundColor: "#E8F7EF",
      borderWidth: 1,
      borderColor: "#9AD3AE",
    },
    errorFeedback: {
      backgroundColor: "#FDECEC",
      borderWidth: 1,
      borderColor: "#E6A1A1",
    },
    feedbackText: {
      color: "#3F414E",
      fontSize: 13,
      textAlign: "center",
    },
    loginButton: {
      height: 50,
      backgroundColor: appTheme.buttonColor,
      borderRadius: 38,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      marginTop: 8,
    },
    loginText: {
      color: "white",
      fontWeight: "500",
      fontSize: 14,
      textAlign: "center",
    },
    forgotText: {
      textAlign: "center",
      marginTop: 12,
      fontWeight: "bold",
      color: appTheme.primaryTextColor,
    },
    signupContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 24,
    },
    signupText: {
      color: appTheme.secondaryTextColor,
    },
    signupButton: {
      color: appTheme.buttonColor,
      fontWeight: "bold",
    },
  });
