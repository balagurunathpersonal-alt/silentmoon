import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Logo from "../../assets/images/svg/logo.svg";

export default function LoadingScreen() {
  const pulse = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const drift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          duration: 1100,
          easing: Easing.out(Easing.ease),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          duration: 1100,
          easing: Easing.in(Easing.ease),
          toValue: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    const rotateAnimation = Animated.loop(
      Animated.timing(rotate, {
        duration: 2400,
        easing: Easing.linear,
        toValue: 1,
        useNativeDriver: true,
      }),
    );

    const driftAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, {
          duration: 3600,
          easing: Easing.inOut(Easing.ease),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(drift, {
          duration: 3600,
          easing: Easing.inOut(Easing.ease),
          toValue: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    pulseAnimation.start();
    rotateAnimation.start();
    driftAnimation.start();

    return () => {
      pulseAnimation.stop();
      rotateAnimation.stop();
      driftAnimation.stop();
    };
  }, [drift, pulse, rotate]);

  const haloScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.86, 1.08],
  });
  const haloOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0.08],
  });
  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const glowTranslate = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [-16, 18],
  });
  const starOpacity = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0.85],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#03174C", "#3540A1", "#EEF1FF"]}
        locations={[0, 0.5, 1]}
        style={styles.backgroundGradient}
      />
      <Animated.View
        style={[
          styles.backgroundGlowPrimary,
          { transform: [{ translateY: glowTranslate }] },
        ]}
      />
      <Animated.View
        style={[
          styles.backgroundGlowSecondary,
          { transform: [{ translateX: glowTranslate }] },
        ]}
      />
      <View style={styles.moon} />
      <View style={styles.moonCutout} />
      <View style={styles.waveBack} />
      <View style={styles.waveFront} />
      <Animated.View style={[styles.starOne, { opacity: starOpacity }]} />
      <Animated.View style={[styles.starTwo, { opacity: starOpacity }]} />
      <Animated.View style={[styles.starThree, { opacity: starOpacity }]} />
      <Animated.View style={[styles.starFour, { opacity: starOpacity }]} />

      <View style={styles.logoContainer}>
        <Logo width={168} height={30} />
      </View>

      <View style={styles.loaderWrap}>
        <Animated.View
          style={[
            styles.halo,
            {
              opacity: haloOpacity,
              transform: [{ scale: haloScale }],
            },
          ]}
        />
        <Animated.View
          style={[styles.orbit, { transform: [{ rotate: spin }] }]}
        >
          <View style={styles.orbitDot} />
        </Animated.View>
        <View style={styles.centerCircle}>
          <ActivityIndicator color="#FFFFFF" size="small" />
        </View>
      </View>

      <Text style={styles.title}>Preparing your calm space</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundGlowPrimary: {
    backgroundColor: "#8E97FD",
    borderRadius: 160,
    height: 320,
    opacity: 0.28,
    position: "absolute",
    right: -140,
    top: 140,
    width: 320,
  },
  backgroundGlowSecondary: {
    backgroundColor: "#FFFFFF",
    borderRadius: 130,
    height: 260,
    left: -118,
    opacity: 0.18,
    position: "absolute",
    top: 72,
    width: 260,
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  moon: {
    backgroundColor: "#FFFFFF",
    borderRadius: 48,
    height: 96,
    opacity: 0.9,
    position: "absolute",
    right: 38,
    top: 92,
    width: 96,
  },
  moonCutout: {
    backgroundColor: "#303A96",
    borderRadius: 44,
    height: 88,
    opacity: 0.98,
    position: "absolute",
    right: 16,
    top: 82,
    width: 88,
  },
  centerCircle: {
    alignItems: "center",
    backgroundColor: "#8E97FD",
    borderRadius: 34,
    height: 68,
    justifyContent: "center",
    width: 68,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#03174C",
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    paddingHorizontal: 24,
  },
  halo: {
    backgroundColor: "#DDE2FF",
    borderRadius: 62,
    height: 124,
    position: "absolute",
    width: 124,
  },
  loaderWrap: {
    alignItems: "center",
    height: 132,
    justifyContent: "center",
    marginTop: 52,
    width: 132,
  },
  logoContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  orbit: {
    borderColor: "#8E97FD",
    borderRadius: 50,
    borderRightColor: "transparent",
    borderWidth: 2,
    height: 100,
    position: "absolute",
    width: 100,
  },
  orbitDot: {
    backgroundColor: "#03174C",
    borderRadius: 5,
    height: 10,
    left: 12,
    position: "absolute",
    top: 8,
    width: 10,
  },
  starFour: {
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    height: 4,
    left: "20%",
    position: "absolute",
    top: "35%",
    width: 4,
  },
  starOne: {
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
    height: 6,
    left: "18%",
    position: "absolute",
    top: "16%",
    width: 6,
  },
  starThree: {
    backgroundColor: "#FFFFFF",
    borderRadius: 2.5,
    height: 5,
    position: "absolute",
    right: "22%",
    top: "29%",
    width: 5,
  },
  starTwo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    height: 4,
    position: "absolute",
    right: "36%",
    top: "13%",
    width: 4,
  },
  title: {
    color: "#3F414E",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 28,
    textAlign: "center",
  },
  waveBack: {
    backgroundColor: "rgba(255, 255, 255, 0.36)",
    borderTopLeftRadius: 240,
    borderTopRightRadius: 160,
    bottom: -116,
    height: 330,
    left: -96,
    position: "absolute",
    right: -60,
    transform: [{ rotate: "-5deg" }],
  },
  waveFront: {
    backgroundColor: "#F8F9FF",
    borderTopLeftRadius: 210,
    borderTopRightRadius: 90,
    bottom: -126,
    height: 300,
    left: -58,
    position: "absolute",
    right: -92,
    transform: [{ rotate: "4deg" }],
  },
});
