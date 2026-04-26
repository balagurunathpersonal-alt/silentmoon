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
import Logo from "../../assets/images/svg/logo.svg";
import { darkTheme, lightTheme } from "../../themes/themes";
import { useMeditateViewModel } from "../../viewmodels/meditate.viewmodel";
import { ActionCard, RecommendationItem } from "../../viewmodels/tab.types";
import HorizontalCarousel from "../components/HorizontalCarousel";

type Theme = typeof lightTheme | typeof darkTheme;

const PracticeCard = ({
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

const RecommendationCard = ({ image, meta, title }: RecommendationItem) => (
  <TouchableOpacity activeOpacity={0.86} style={stylesBase.recommendationCard}>
    {image ? (
      <Image source={image} style={stylesBase.recommendationArt} />
    ) : null}
    <Text style={stylesBase.recommendationTitle}>{title}</Text>
    <Text style={stylesBase.recommendationMeta}>{meta}</Text>
  </TouchableOpacity>
);

const MeditateScreen = () => {
  const {
    cards,
    featured,
    recommendations,
    sectionTitle,
    subtitle,
    theme,
    title,
  } = useMeditateViewModel();
  const styleSheet = styles(theme);

  return (
    <SafeAreaView style={styleSheet.safeArea}>
      <ScrollView
        contentContainerStyle={styleSheet.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styleSheet.header}>
          <Logo width={168} height={30} />
        </View>

        <View style={styleSheet.heroSection}>
          <Text style={styleSheet.title}>{title}</Text>
          <Text style={styleSheet.subtitle}>{subtitle}</Text>
        </View>

        <TouchableOpacity activeOpacity={0.86} style={styleSheet.featuredCard}>
          <Image source={featured.image} style={styleSheet.featuredImage} />
          <View style={styleSheet.featuredContent}>
            <View>
              <Text style={styleSheet.featuredTitle}>{featured.title}</Text>
              <Text style={styleSheet.featuredSubtitle}>
                {featured.subtitle}
              </Text>
            </View>
            <View style={styleSheet.playButton}>
              <Text style={styleSheet.playButtonText}>
                {featured.buttonLabel}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styleSheet.cardsRow}>
          {cards.map((card) => (
            <PracticeCard key={card.title} {...card} />
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
    minHeight: 190,
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
    resizeMode: "cover",
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
    heroSection: {
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
      lineHeight: 24,
      marginTop: 8,
    },
    featuredCard: {
      backgroundColor: "#F2F3F7",
      borderRadius: 12,
      marginBottom: 20,
      overflow: "hidden",
    },
    featuredContent: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 22,
      paddingVertical: 18,
    },
    featuredImage: {
      height: 150,
      resizeMode: "cover",
      width: "100%",
    },
    featuredSubtitle: {
      color: theme.secondaryTextColor,
      fontSize: 11,
      fontWeight: "700",
      marginTop: 8,
    },
    featuredTitle: {
      color: theme.primaryTextColor,
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
      color: theme.primaryTextColor,
      fontSize: 22,
      fontWeight: "700",
    },
    recommendationsRow: {
      flexDirection: "row",
      gap: 16,
    },
  });

export default MeditateScreen;
