import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackgroundPattern from "../../assets/images/svg/topicsbg.svg";
import { TOPIC_STRINGS } from "../../constants/topic-strings";
import { useAppNavigationHandler } from "../../navigation/app-navigation";

const topicImages = {
  anxiety: require("../../assets/images/anxiety.png"),
  calm: require("../../assets/images/calm.png"),
  confident: require("../../assets/images/confident.png"),
  energy: require("../../assets/images/energy.png"),
  focus: require("../../assets/images/focus.png"),
  growth: require("../../assets/images/growth.png"),
  happiness: require("../../assets/images/happiness.png"),
  meditation: require("../../assets/images/meditation.png"),
  performance: require("../../assets/images/performance.png"),
  relaxation: require("../../assets/images/relaxation.png"),
  sleep: require("../../assets/images/sleep.png"),
  stress: require("../../assets/images/stress.png"),
};

const topics = TOPIC_STRINGS.topics.map((topic) => ({
  ...topic,
  image: topicImages[topic.imageName],
}));

const TopicCard = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.card}
    activeOpacity={0.85}
    onPress={() => onPress && onPress(item)}
  >
    <ImageBackground
      source={item.image}
      style={styles.image}
      imageStyle={styles.imageBorder}
    >
      {/* <View style={styles.overlay}>
        <Text style={styles.cardText}>{item.title}</Text>
      </View> */}
    </ImageBackground>
  </TouchableOpacity>
);

export default function TopicsScreen() {
  const navigation = useAppNavigationHandler();
  const route = useRoute();
  const reminderReturnTo = route.params?.reminderReturnTo;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // static content — simulate refresh briefly
    setTimeout(() => setRefreshing(false), 700);
  };

  const handlePress = (item) => {
    // Navigate to the reminder screen and pass topic details as params
    navigation.navigate("Reminder", {
      reminderReturnTo,
      topicId: item.id,
      topicTitle: item.title,
      selectedTopic: {
        id: item.id,
        title: item.title,
      },
    });
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Background SVG pattern */}
        <View style={styles.background}>
          <BackgroundPattern />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{TOPIC_STRINGS.screen.title}</Text>
          <Text style={styles.title2}>
            {TOPIC_STRINGS.screen.titleSecondLine}
          </Text>
          <Text style={styles.subtitle}>{TOPIC_STRINGS.screen.subtitle}</Text>
        </View>

        <FlatList
          data={topics}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <TopicCard item={item} onPress={handlePress} />
          )}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
  },
  textContainer: {
    marginTop: 40,
    alignItems: "left",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    textAlign: "left",
  },
  title2: {
    fontSize: 28,
    fontWeight: "300",
    color: "#333",
    textAlign: "left",
  },
  subtitle: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 16,
    fontWeight: "400",
    color: "#666",
    textAlign: "left",
  },
  listContent: {
    paddingBottom: 24,
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    marginBottom: 16,
    marginHorizontal: 6,
    height: 190,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageBorder: {
    borderRadius: 16,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.22)",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  cardText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
