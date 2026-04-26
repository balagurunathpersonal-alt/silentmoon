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
import { useAppNavigationHandler } from "../../navigation/app-navigation";

const topics = [
  {
    id: "1",
    title: "Reduce Stress",
    image: require("../../assets/images/stress.png"),
  },
  {
    id: "2",
    title: "Improve Performance",
    image: require("../../assets/images/performance.png"),
  },
  {
    id: "3",
    title: "Increase Happiness",
    image: require("../../assets/images/happiness.png"),
  },
  {
    id: "4",
    title: "Reduce Anxiety",
    image: require("../../assets/images/anxiety.png"),
  },
  {
    id: "5",
    title: "Personal Growth",
    image: require("../../assets/images/growth.png"),
  },
  {
    id: "6",
    title: "Better Sleep",
    image: require("../../assets/images/sleep.png"),
  },
  {
    id: "7",
    title: "Focus",
    image: require("../../assets/images/focus.png"),
  },
  {
    id: "8",
    title: "Meditation",
    image: require("../../assets/images/meditation.png"),
  },
  {
    id: "9",
    title: "Calm Mind",
    image: require("../../assets/images/calm.png"),
  },
  {
    id: "10",
    title: "Confidence",
    image: require("../../assets/images/confident.png"),
  },
  {
    id: "11",
    title: "Relaxation",
    image: require("../../assets/images/relaxation.png"),
  },
  {
    id: "12",
    title: "Energy",
    image: require("../../assets/images/energy.png"),
  },
];

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

  const handlePress = (item) => {
    // Navigate to the reminder screen and pass topic details as params
    navigation.navigate("Reminder", {
      topicId: item.id,
      topicTitle: item.title,
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
          <Text style={styles.title}>What Brings you</Text>
          <Text style={styles.title2}>to Silent Moon?</Text>
          <Text style={styles.subtitle}>choose a topic to focus on:</Text>
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
