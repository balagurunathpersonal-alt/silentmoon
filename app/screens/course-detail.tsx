import { Feather } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useMemo, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    GestureResponderEvent,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useAppNavigationHandler } from "../../navigation/app-navigation";
import { CourseSession, RootStackParamList } from "../../types/navigation";

type CourseDetailRouteProp = RouteProp<RootStackParamList, "CourseDetail">;

const fallbackHeroImage = require("../../assets/images/course-details-hero.png");

const BASE_WIDTH = 414;
const HERO_HEIGHT = 289;

const DEFAULT_SESSIONS = [
  {
    audioUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration: "10 MIN",
    title: "Focus Attention",
  },
  {
    audioUrl: "https://filesamples.com/samples/audio/mp3/sample1.mp3",
    duration: "5 MIN",
    title: "Body Scan",
  },
  {
    audioUrl: "https://filesamples.com/samples/audio/mp3/sample2.mp3",
    duration: "3 MIN",
    title: "Making Happiness",
  },
];
const DEFAULT_DESCRIPTION =
  "Ease the mind into a restful night's sleep with these deep, ambient tones.";

const renderSessionItem = ({
  index,
  item,
  onPress,
}: {
  index: number;
  item: CourseSession;
  onPress: (item: CourseSession) => void;
}) => {
  const isActive = index === 0;

  return (
    <TouchableOpacity
      activeOpacity={0.78}
      onPress={() => onPress(item)}
      style={styles.sessionRow}
    >
      <View
        style={[
          styles.playButton,
          isActive ? styles.activePlayButton : styles.idlePlayButton,
        ]}
      >
        <Feather
          name="play"
          size={17}
          color={isActive ? "#FFFFFF" : "#A1A4B2"}
        />
      </View>
      <View style={styles.sessionTextWrap}>
        <Text style={styles.sessionTitle}>{item.title}</Text>
        <Text style={styles.sessionDuration}>{item.duration}</Text>
      </View>
    </TouchableOpacity>
  );
};

const CourseDetailScreen = () => {
  const navigation = useAppNavigationHandler();
  const { params } = useRoute<CourseDetailRouteProp>();
  const touchStartRef = useRef({ x: 0, y: 0 });
  const [activeNarratorIndex, setActiveNarratorIndex] = useState(0);
  const { course } = params;
  const screenWidth = Dimensions.get("window").width;
  const scale = screenWidth / BASE_WIDTH;
  const heroHeight = HERO_HEIGHT * scale;
  const heroImage = course.heroImageUrl
    ? { uri: course.heroImageUrl }
    : fallbackHeroImage;

  const narratorSessions = useMemo(
    () => [
      (course.narratorSessions?.male?.length
        ? course.narratorSessions.male
        : DEFAULT_SESSIONS) as CourseSession[],
      (course.narratorSessions?.female?.length
        ? course.narratorSessions.female
        : DEFAULT_SESSIONS) as CourseSession[],
    ],
    [course.narratorSessions],
  );

  const handleNarratorPress = (index: number) => {
    setActiveNarratorIndex(index);
  };

  const handleSessionPress = (session: CourseSession) => {
    navigation.navigate("MusicPlayer", {
      music: {
        description: course.description || DEFAULT_DESCRIPTION,
        duration: session.duration,
        id: `${course.id ?? course.title}-${session.title}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
        name: session.title,
        url: session.audioUrl,
      },
    });
  };

  const handleListTouchStart = (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;
    touchStartRef.current = { x: pageX, y: pageY };
  };

  const handleListTouchEnd = (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;
    const deltaX = pageX - touchStartRef.current.x;
    const deltaY = pageY - touchStartRef.current.y;

    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0 && activeNarratorIndex === 0) {
      setActiveNarratorIndex(1);
    }

    if (deltaX > 0 && activeNarratorIndex === 1) {
      setActiveNarratorIndex(0);
    }
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={heroImage}
        resizeMode="cover"
        style={[styles.hero, { height: heroHeight }]}
      >
        <TouchableOpacity
          activeOpacity={0.78}
          onPress={navigation.goBack}
          style={[
            styles.backButton,
            {
              height: 55 * scale,
              left: 20 * scale,
              top: 50 * scale,
              width: 55 * scale,
            },
          ]}
        >
          <Feather name="arrow-left" size={25 * scale} color="#3F414E" />
        </TouchableOpacity>

        <View
          style={[
            styles.heroActions,
            {
              gap: 15 * scale,
              right: 20 * scale,
              top: 50 * scale,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.78}
            style={[
              styles.heroButton,
              { height: 55 * scale, width: 55 * scale },
            ]}
          >
            <Feather name="heart" size={23 * scale} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.78}
            style={[
              styles.heroButton,
              { height: 55 * scale, width: 55 * scale },
            ]}
          >
            <Feather name="download" size={22 * scale} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.category}>{course.subtitle}</Text>
        <Text style={styles.description}>
          {course.description || DEFAULT_DESCRIPTION}
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Feather name="heart" size={22} color="#FF6E8F" />
            <Text style={styles.statText}>
              {course.favoriteCount ?? "24,234 Favorites"}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Feather name="headphones" size={22} color="#7FD7E8" />
            <Text style={styles.statText}>
              {course.listeningCount ?? "34,234 Listening"}
            </Text>
          </View>
        </View>

        <Text style={styles.narratorTitle}>Pick a Narrator</Text>

        <View style={styles.tabsRow}>
          {["MALE VOICE", "FEMALE VOICE"].map((label, index) => (
            <TouchableOpacity
              activeOpacity={0.78}
              key={label}
              onPress={() => handleNarratorPress(index)}
              style={styles.tabItem}
            >
              <Text
                style={
                  activeNarratorIndex === index
                    ? styles.activeTabText
                    : styles.inactiveTabText
                }
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
          <View
            style={[
              styles.activeUnderline,
              { left: activeNarratorIndex === 0 ? 49 : 220 },
            ]}
          />
        </View>
      </View>

      <View
        onTouchEnd={handleListTouchEnd}
        onTouchStart={handleListTouchStart}
        style={styles.narratorListWrap}
      >
        <FlatList
          data={narratorSessions[activeNarratorIndex]}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={({ index, item }) =>
            renderSessionItem({
              index,
              item,
              onPress: handleSessionPress,
            })
          }
          showsVerticalScrollIndicator
          style={styles.sessionFlatList}
          contentContainerStyle={styles.sessionList}
        />
      </View>

      <View style={styles.homeIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  hero: {
    overflow: "hidden",
    width: "100%",
  },
  backButton: {
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 38,
    justifyContent: "center",
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  heroActions: {
    flexDirection: "row",
    position: "absolute",
  },
  heroButton: {
    alignItems: "center",
    backgroundColor: "rgba(3, 23, 76, 0.5)",
    borderRadius: 38,
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 31,
  },
  title: {
    color: "#3F414E",
    fontSize: 34,
    fontWeight: "700",
    lineHeight: 37,
  },
  category: {
    color: "#A1A4B2",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.7,
    lineHeight: 15,
    marginTop: 14,
  },
  description: {
    color: "#A1A4B2",
    fontSize: 16,
    fontWeight: "300",
    lineHeight: 23,
    marginTop: 20,
    maxWidth: 360,
  },
  statsRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 32,
    marginTop: 28,
  },
  statItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  statText: {
    color: "#A1A4B2",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 15,
  },
  narratorTitle: {
    color: "#3F414E",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 22,
    marginTop: 39,
  },
  tabsRow: {
    borderBottomColor: "#EBEAEC",
    borderBottomWidth: 1,
    flexDirection: "row",
    marginHorizontal: -20,
    marginTop: 20,
    minHeight: 37,
    paddingHorizontal: 20,
    position: "relative",
  },
  tabItem: {
    width: 174,
  },
  activeTabText: {
    color: "#8E97FD",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.8,
    lineHeight: 17,
  },
  inactiveTabText: {
    color: "#A1A4B2",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.8,
    lineHeight: 17,
  },
  activeUnderline: {
    backgroundColor: "#8E97FD",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    bottom: -1,
    height: 2,
    left: 49,
    position: "absolute",
    width: 47,
  },
  narratorListWrap: {
    flex: 1,
  },
  sessionFlatList: {
    flex: 1,
  },
  sessionList: {
    paddingBottom: 12,
    paddingHorizontal: 20,
  },
  sessionRow: {
    alignItems: "center",
    borderBottomColor: "#F2F3F7",
    borderBottomWidth: 1,
    flexDirection: "row",
    minHeight: 80,
  },
  playButton: {
    alignItems: "center",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    marginRight: 20,
    width: 40,
  },
  activePlayButton: {
    backgroundColor: "#8E97FD",
  },
  idlePlayButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#A1A4B2",
    borderWidth: 1,
  },
  sessionTextWrap: {
    flex: 1,
    justifyContent: "center",
  },
  sessionTitle: {
    color: "#3F414E",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 18,
  },
  sessionDuration: {
    color: "#A1A4B2",
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 0.55,
    lineHeight: 12,
    marginTop: 5,
  },
  homeIndicator: {
    alignSelf: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    height: 5,
    marginBottom: 9,
    marginTop: 5,
    width: 143,
  },
});

export default CourseDetailScreen;
