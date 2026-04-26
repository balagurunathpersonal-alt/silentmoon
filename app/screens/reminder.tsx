// app/reminder.tsx
import { useTheme } from "@/themes/theme-context";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
// notifications handled by react-native-push-notification in viewmodel
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackgroundPattern from "../../assets/images/svg/loginBG.svg";
import { REMINDER_STRINGS } from "../../constants/reminder-strings";
import { useAppNavigationHandler } from "../../navigation/app-navigation";
import { darkTheme, lightTheme } from "../../themes/themes";
import { useReminderViewModel } from "../../viewmodels/reminder.viewmodel";
import SilentMoonButton from "../components/LinkButton";
type Theme = typeof lightTheme | typeof darkTheme;

// Notification display/behavior handled in native module configuration

const { days } = REMINDER_STRINGS;

export default function ReminderScreen() {
  const {
    content,
    topic,
    time,
    setTime,
    showPicker,
    setShowPicker,
    selectedDays,
    toggleDay,
    scheduleReminder,
    cancelScheduled,
    closeReminderFlow,
  } = useReminderViewModel();

  const { theme } = useTheme();
  const navigation = useAppNavigationHandler();

  const styleSheet = styles(theme);

  return (
    <SafeAreaView style={styleSheet.safeArea}>
      <View style={styleSheet.container}>
        <TouchableOpacity
          accessibilityLabel={REMINDER_STRINGS.labels.backAccessibility}
          accessibilityRole="button"
          style={styleSheet.backButton}
          onPress={() => navigation.backOrReplace("Topics")}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={styleSheet.backIcon.color}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        {/* Background SVG pattern */}
        <View style={styleSheet.background}>
          <BackgroundPattern />
        </View>

        {topic && (
          <Text style={styleSheet.topicLabel}>
            {`${REMINDER_STRINGS.labels.topicPrefix} ${topic}`}
          </Text>
        )}
        <Text style={styleSheet.header}>{content.timeTitle}</Text>
        <Text style={styleSheet.subHeader}>{content.timeSubtitle}</Text>

        <TouchableOpacity
          style={styleSheet.timeButton}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styleSheet.timeText}>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="spinner"
            onChange={(event, selected) => {
              setShowPicker(false);
              if (selected) setTime(selected);
            }}
          />
        )}

        <Text style={styleSheet.header}>{content.dayTitle}</Text>
        <Text style={styleSheet.subHeader}>{content.daySubtitle}</Text>

        <View style={styleSheet.daysRow}>
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styleSheet.dayButton,
                selectedDays.includes(day) && styleSheet.daySelected,
              ]}
              onPress={() => toggleDay(day)}
            >
              <Text
                style={[
                  styleSheet.dayText,
                  selectedDays.includes(day) && styleSheet.dayTextSelected,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <SilentMoonButton
          disabled={false}
          onPress={scheduleReminder}
          textStyle={styleSheet.saveText}
          containerStyle={styleSheet.saveButton}
        >
          {REMINDER_STRINGS.buttons.save}
        </SilentMoonButton>

        {/*
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: "#666" }]}
        onPress={sendTestNotification}
      >
        <Text style={styles.saveText}>SEND TEST</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: "#AAA" }]}
        onPress={cancelScheduled}
      >
        <Text style={[styles.saveText, { color: "#000" }]}>CANCEL ALL</Text>
      </TouchableOpacity>
      */}

        <TouchableOpacity onPress={closeReminderFlow}>
          <Text style={styleSheet.noThanks}>
            {REMINDER_STRINGS.buttons.noThanks}
          </Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = (appTheme: Theme) =>
  StyleSheet.create({
    safeArea: { flex: 1, justifyContent: "center" },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: appTheme.background,
    },
    backButton: {
      alignItems: "center",
      height: 40,
      justifyContent: "center",
      left: 16,
      position: "absolute",
      top: 16,
      width: 40,
      zIndex: 1,
      borderRadius: 20,
      backgroundColor: appTheme.textBoxBackground || "rgba(0,0,0,0.04)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
      elevation: 3,
    },
    backIcon: {
      color: appTheme.text,
    },
    // container: { flex: 1, padding: 20, justifyContent: "center" },
    header: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
    topicLabel: {
      color: appTheme.buttonColor,
      fontSize: 13,
      fontWeight: "700",
      marginBottom: 8,
      textTransform: "uppercase",
    },
    subHeader: {
      fontSize: 14,
      color: appTheme.secondaryTextColor,
      marginBottom: 16,
    },
    timeButton: {
      backgroundColor: appTheme.textBoxStrokeColor,
      padding: 16,
      borderRadius: 12,
      alignItems: "center",
      marginBottom: 20,
    },
    timeText: { fontSize: 18, fontWeight: "600" },
    daysRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 20,
    },
    dayButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: appTheme.secondaryTextColor,
      alignItems: "center",
      justifyContent: "center",
    },
    daySelected: { backgroundColor: appTheme.text },
    dayText: { fontSize: 12, color: appTheme.text },
    dayTextSelected: { color: appTheme.background },
    saveButton: {
      backgroundColor: appTheme.buttonColor,
      padding: 16,
      borderRadius: 12,
      alignItems: "center",
      marginBottom: 12,
    },
    saveText: {
      color: appTheme.primaryTextColor,
      fontSize: 16,
      fontWeight: "700",
    },
    noThanks: {
      textAlign: "center",
      color: appTheme.buttonColor,
      fontSize: 14,
    },
    background: {
      ...StyleSheet.absoluteFillObject,
      // width: "100%",
      // height: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
    },
  });
