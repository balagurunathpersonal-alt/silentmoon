import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PlaceholderCarousel from "../../assets/images/placeholder-coming-soon-160x110.svg";
import LogoWhite from "../../assets/images/svg/logo-white.svg";
import { useAppNavigationHandler } from "../../navigation/app-navigation";
import { darkTheme, lightTheme } from "../../themes/themes";
import { useSleepViewModel } from "../../viewmodels/sleep.viewmodel";
import { ActionCard, RecommendationItem } from "../../viewmodels/tab.types";
import HorizontalCarousel from "../components/HorizontalCarousel";

type Theme = typeof lightTheme | typeof darkTheme;

const SleepCard = ({
  backgroundColor,
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
    <View>
      <Text style={[stylesBase.cardTitle, { color: textColor }]}>{title}</Text>
      <Text style={[stylesBase.cardSubtitle, { color: textColor }]}>
        {subtitle}
      </Text>
    </View>
    <View style={stylesBase.cardFooter}>
      <Text style={[stylesBase.cardTime, { color: textColor }]}>
        {duration}
      </Text>
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
  image,
  meta,
  onPress,
  title,
}: RecommendationItem & { onPress: () => void }) => (
  <TouchableOpacity
    activeOpacity={0.86}
    onPress={onPress}
    style={stylesBase.recommendationCard}
  >
    {/** Show image when available, otherwise themed placeholder */}
    {/** Keep artColor as background for the placeholder container */}
    {/** Placeholder is wrapped to match image sizing */}
    {/** If in future items include `image`, it will render the image instead */}
    {image ? (
      <Image source={image} style={stylesBase.recommendationArt} />
    ) : (
      <View
        style={[stylesBase.recommendationArt, { backgroundColor: artColor }]}
      >
        <View style={stylesBase.placeholderWrapper}>
          <View style={stylesBase.placeholderInner}>
            <PlaceholderCarousel width={120} height={80} />
          </View>
        </View>
      </View>
    )}
    <Text style={stylesBase.recommendationTitle}>{title}</Text>
    <Text style={stylesBase.recommendationMeta}>{meta}</Text>
  </TouchableOpacity>
);

const SleepScreen = () => {
  const {
    cards,
    featured,
    recommendations,
    sectionTitle,
    subtitle,
    theme,
    title,
  } = useSleepViewModel();
  const navigation = useAppNavigationHandler();
  const styleSheet = styles(theme);
  const openCourseDetail = (course: ActionCard) => {
    navigation.navigate("CourseDetail", {
      course: {
        backgroundColor: course.backgroundColor,
        description: course.description ?? "",
        duration: course.duration,
        favoriteCount: course.favoriteCount,
        heroImageUrl: course.heroImageUrl,
        courseID: course.courseID,
        listeningCount: course.listeningCount,
        narratorSessions: course.narratorSessions,
        subtitle: course.subtitle,
        textColor: course.textColor,
        title: course.title,
      },
    });
  };
  const openRecommendation = (item: RecommendationItem) => {
    navigation.navigate("CourseDetail", {
      course: {
        backgroundColor: item.artColor ?? "#F5F5FF",
        description:
          item.description ??
          "A soothing sleep session for helping the body unwind and the mind drift toward rest.",
        duration: item.duration ?? "12 MIN",
        favoriteCount: "22,640 Favorites",
        courseID: item.id,
        listeningCount: "35,210 Listening",
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
          <LogoWhite width={168} height={30} />
        </View>

        <View style={styleSheet.heroSection}>
          <Text style={styleSheet.title}>{title}</Text>
          <Text style={styleSheet.subtitle}>{subtitle}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.86}
          onPress={() => openCourseDetail(featured)}
          style={styleSheet.featuredCard}
        >
          <Image source={featured.image} style={styleSheet.featuredImage} />
          <View style={styleSheet.featuredContent}>
            <Text style={styleSheet.featuredTitle}>{featured.title}</Text>
            <Text style={styleSheet.featuredSubtitle}>{featured.subtitle}</Text>
            <View style={styleSheet.featuredFooter}>
              <Text style={styleSheet.featuredMeta}>{featured.meta}</Text>
              <View style={styleSheet.playButton}>
                <Text style={styleSheet.playButtonText}>
                  {featured.buttonLabel}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styleSheet.cardsRow}>
          {cards.map((card) => (
            <SleepCard
              key={card.courseID}
              {...card}
              onPress={() => openCourseDetail(card)}
            />
          ))}
        </View>

        <View style={styleSheet.sectionHeader}>
          <Text style={styleSheet.sectionTitle}>{sectionTitle}</Text>
        </View>

        <HorizontalCarousel
          data={recommendations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecommendationCard
              {...item}
              onPress={() => openRecommendation(item)}
            />
          )}
          placeholder={<PlaceholderCarousel width={160} height={110} />}
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
    justifyContent: "space-between",
    minHeight: 185,
    padding: 18,
  },
  cardFooter: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
  placeholderWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderInner: {
    width: 120,
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
  },
  recommendationCard: {
    flex: 1,
  },
  recommendationWrapper: {
    marginRight: 16,
    width: 160,
  },
  recommendationMeta: {
    color: "#EBEAEC",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 6,
  },
  recommendationTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

const styles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: "#03174C",
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
    heroSection: {
      alignItems: "center",
      marginBottom: 24,
    },
    title: {
      color: "#FFFFFF",
      fontSize: 28,
      fontWeight: "700",
      textAlign: "center",
    },
    subtitle: {
      color: "#EBEAEC",
      fontSize: 16,
      lineHeight: 24,
      marginTop: 12,
      textAlign: "center",
    },
    featuredCard: {
      backgroundColor: "#F5F5FF",
      borderRadius: 12,
      marginBottom: 20,
      overflow: "hidden",
    },
    featuredContent: {
      paddingHorizontal: 22,
      paddingVertical: 18,
    },
    featuredFooter: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 18,
    },
    featuredImage: {
      height: 160,
      resizeMode: "cover",
      width: "100%",
    },
    featuredMeta: {
      color: "#A1A4B2",
      fontSize: 12,
      fontWeight: "700",
    },
    featuredSubtitle: {
      color: "#A1A4B2",
      fontSize: 11,
      fontWeight: "700",
      marginTop: 8,
    },
    featuredTitle: {
      color: "#3F414E",
      fontSize: 22,
      fontWeight: "700",
    },
    cardsRow: {
      flexDirection: "row",
      gap: 16,
      marginBottom: 28,
    },
    playButton: {
      alignItems: "center",
      backgroundColor: "#8E97FD",
      borderRadius: 20,
      minWidth: 70,
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    playButtonText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "700",
    },
    sectionHeader: {
      marginBottom: 16,
    },
    sectionTitle: {
      color: "#FFFFFF",
      fontSize: 22,
      fontWeight: "700",
    },
    recommendationsRow: {
      flexDirection: "row",
      gap: 16,
    },
  });

export default SleepScreen;
