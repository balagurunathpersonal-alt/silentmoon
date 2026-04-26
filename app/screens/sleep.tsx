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
import LogoWhite from "../../assets/images/svg/logo-white.svg";
import { darkTheme, lightTheme } from "../../themes/themes";
import { useSleepViewModel } from "../../viewmodels/sleep.viewmodel";
import { ActionCard, RecommendationItem } from "../../viewmodels/tab.types";
import HorizontalCarousel from "../components/HorizontalCarousel";

type Theme = typeof lightTheme | typeof darkTheme;

const SleepCard = ({
  backgroundColor,
  duration,
  subtitle,
  textColor = "#FFFFFF",
  title,
}: ActionCard) => (
  <TouchableOpacity
    activeOpacity={0.86}
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
      <TouchableOpacity activeOpacity={0.78} style={stylesBase.startButton}>
        <Text style={stylesBase.startButtonText}>START</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const RecommendationCard = ({ artColor, meta, title }: RecommendationItem) => (
  <TouchableOpacity activeOpacity={0.86} style={stylesBase.recommendationCard}>
    <View
      style={[stylesBase.recommendationArt, { backgroundColor: artColor }]}
    />
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
  const styleSheet = styles(theme);

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

        <TouchableOpacity activeOpacity={0.86} style={styleSheet.featuredCard}>
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
            <SleepCard key={card.title} {...card} />
          ))}
        </View>

        <View style={styleSheet.sectionHeader}>
          <Text style={styleSheet.sectionTitle}>{sectionTitle}</Text>
        </View>

        <HorizontalCarousel
          data={recommendations}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <RecommendationCard {...item} />}
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
