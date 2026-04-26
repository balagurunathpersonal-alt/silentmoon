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
import { useAppNavigationHandler } from "../../navigation/app-navigation";
import { darkTheme, lightTheme } from "../../themes/themes";
import { useHomeViewModel } from "../../viewmodels/home.viewmodel";
import { ActionCard, RecommendationItem } from "../../viewmodels/tab.types";
import HorizontalCarousel from "../components/HorizontalCarousel";

type Theme = typeof lightTheme | typeof darkTheme;

const CourseCard = ({
  backgroundColor,
  backgroundImage: BackgroundImage,
  duration,
  onPress,
  subtitle,
  textColor = "#FFFFFF",
  title,
}: ActionCard & { onPress: () => void }) => (
  <TouchableOpacity
    activeOpacity={0.86}
    onPress={onPress}
    style={[stylesBase.card, { backgroundColor }]}
  >
    {BackgroundImage && (
      // <View style={stylesBase.bgContainer}>
      <BackgroundImage style={stylesBase.backgroundImageStyle} />
      // </View>
    )}
    <View style={{ flex: 1 }} />
    <Text style={[stylesBase.cardTitle, { color: textColor }]}>{title}</Text>
    <Text style={[stylesBase.cardSubtitle, { color: textColor }]}>
      {subtitle}
    </Text>
    <View style={{ flex: 1 }} />
    <View style={stylesBase.cardFooter}>
      <Text style={[stylesBase.cardTime, { color: textColor }]}>
        {duration}
      </Text>
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        activeOpacity={0.78}
        onPress={onPress}
        style={stylesBase.startButton}
      >
        <Text style={stylesBase.startButtonText}>START</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const RecommendationCard = ({
  artColor,
  meta,
  onPress,
  title,
}: RecommendationItem & { onPress: () => void }) => (
  <TouchableOpacity
    activeOpacity={0.86}
    onPress={onPress}
    style={stylesBase.recommendationCard}
  >
    <View
      style={[stylesBase.recommendationArt, { backgroundColor: artColor }]}
    />
    <Text style={stylesBase.recommendationTitle}>{title}</Text>
    <Text style={stylesBase.recommendationMeta}>{meta}</Text>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const {
    courses,
    dailyThought,
    greeting,
    recommendations,
    sectionTitle,
    subtitle,
    theme,
  } = useHomeViewModel();
  const navigation = useAppNavigationHandler();
  const styleSheet = styles(theme);
  const openRecommendation = (item: RecommendationItem) => {
    navigation.navigate("CourseDetail", {
      course: {
        backgroundColor: item.artColor ?? "#8E97FD",
        description:
          item.description ??
          "A guided Silent Moon session designed to help you pause, reset, and return with a calmer mind.",
        duration: item.duration ?? "10 MIN",
        favoriteCount: "18,240 Favorites",
        id: item.id,
        listeningCount: "27,580 Listening",
        subtitle: item.meta,
        textColor: "#3F414E",
        title: item.title,
      },
    });
  };

  return (
    <SafeAreaView style={styleSheet.safeArea}>
      <ScrollView
        contentContainerStyle={styleSheet.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styleSheet.header}>
          <Logo width={168} height={30} />
        </View>

        <View style={styleSheet.welcomeSection}>
          <Text style={styleSheet.title}>{greeting}</Text>
          <Text style={styleSheet.subtitle}>{subtitle}</Text>
        </View>

        <View style={styleSheet.cardsRow}>
          {courses.map((course) => (
            <CourseCard
              key={course.title}
              {...course}
              onPress={() =>
                navigation.navigate("CourseDetail", {
                  course: {
                    backgroundColor: course.backgroundColor,
                    description: course.description ?? "",
                    duration: course.duration,
                    favoriteCount: course.favoriteCount,
                    heroImageUrl: course.heroImageUrl,
                    id: course.id,
                    listeningCount: course.listeningCount,
                    narratorSessions: course.narratorSessions,
                    subtitle: course.subtitle,
                    textColor: course.textColor,
                    title: course.title,
                  },
                })
              }
            />
          ))}
        </View>

        <TouchableOpacity activeOpacity={0.86} style={styleSheet.dailyCard}>
          <View>
            <Text style={styleSheet.dailyTitle}>{dailyThought.title}</Text>
            <Text style={styleSheet.dailySubtitle}>
              {dailyThought.subtitle}
            </Text>
          </View>
          <View style={styleSheet.playButton}>
            <Text style={styleSheet.playButtonText}>
              {dailyThought.buttonLabel}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styleSheet.sectionHeader}>
          <Text style={styleSheet.sectionTitle}>{sectionTitle}</Text>
        </View>

        <HorizontalCarousel
          data={recommendations}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <RecommendationCard
              {...item}
              onPress={() => openRecommendation(item)}
            />
          )}
          contentContainerStyle={styleSheet.recommendationsRow}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const stylesBase = StyleSheet.create({
  card: {
    borderRadius: 12,
    flex: 1,
    minHeight: 210,
    padding: 18,
    justifyContent: "center",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  cardFooter: {
    // alignItems: "center",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // gap: 15,

    flexDirection: "row",
    justifyContent: "flex-start", // equal space between duration and button
    alignItems: "center",
    gap: 10,
  },
  cardSubtitle: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 6,
  },
  cardTime: {
    fontSize: 11,
    fontWeight: "700",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  // bgContainer: {
  //   flex: 1,
  //   // padding: -18,
  //   alignItems: "flex-end", // Align left
  //   justifyContent: "flex-end", //
  //   overflow: "hidden",
  // },
  backgroundImageStyle: {
    position: "absolute",
    top: -10,
    right: -10,
    overflow: "hidden",
    // marginRight: -10,
    // marginTop: -10,
  },
  startButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    minWidth: 70,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  startButtonText: {
    color: "#3F414E",
    fontSize: 12,
    fontWeight: "700",
  },
  recommendationArt: {
    borderRadius: 12,
    height: 110,
    marginBottom: 12,
    width: "100%",
  },
  recommendationCard: {
    flex: 1,
  },
  recommendationWrapper: {
    marginRight: 16,
    width: 160,
  },
  recommendationMeta: {
    color: "#A1A4B2",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 6,
  },
  recommendationTitle: {
    color: "#3F414E",
    fontSize: 16,
    fontWeight: "700",
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
    welcomeSection: {
      marginBottom: 24,
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
    cardsRow: {
      flexDirection: "row",
      gap: 16,
      marginBottom: 20,
    },
    dailyCard: {
      alignItems: "center",
      backgroundColor: "#333242",
      borderRadius: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 28,
      minHeight: 95,
      paddingHorizontal: 22,
      paddingVertical: 18,
    },
    dailySubtitle: {
      color: "#EBEAEC",
      fontSize: 11,
      fontWeight: "700",
      marginTop: 8,
    },
    dailyTitle: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "700",
    },
    playButton: {
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      minWidth: 70,
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    playButtonText: {
      color: "#3F414E",
      fontSize: 12,
      fontWeight: "700",
    },
    sectionHeader: {
      marginBottom: 16,
    },
    sectionTitle: {
      color: theme.primaryTextColor,
      fontSize: 22,
      fontWeight: "700",
    },
    recommendationsRow: {
      flexDirection: "row",
      gap: 16,
    },
  });

export default HomeScreen;
