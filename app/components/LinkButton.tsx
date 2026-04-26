import React from "react";
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

type Props = {
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
};

export default function SilentMoonButton({
  disabled,
  onPress,
  children,
  textStyle,
  containerStyle,
}: Props) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={containerStyle}
    >
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
