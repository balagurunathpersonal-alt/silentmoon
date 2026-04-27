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
import Logo from "../../assets/images/svg/logo.svg";
import { useAppNavigationHandler } from "../../navigation/app-navigation";
import { darkTheme, lightTheme } from "../../themes/themes";
import { useMusicViewModel } from "../../viewmodels/music.viewmodel";
import { ActionCard, RecommendationItem } from "../../viewmodels/tab.types";
import HorizontalCarousel from "../components/HorizontalCarousel";

type Theme = typeof lightTheme | typeof darkTheme;

const MusicCard = ({
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
    {image ? (
      <Image source={image} style={stylesBase.recommendationArt} />
    ) : (
      <View style={stylesBase.recommendationArt}>
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

const MusicScreen = () => {
  const {
    cards,
    featured,
    recommendations,
    sectionTitle,
    subtitle,
    theme,
    title,
  } = useMusicViewModel();
  const navigation = useAppNavigationHandler();
  const styleSheet = styles(theme);
  const openPlayer = (music: {
    audioUrl?: string;
    description?: string;
    duration?: string;
    id?: string;
    subtitle?: string;
    title: string;
  }) => {
    navigation.navigate("MusicPlayer", {
      music: {
        description: music.description ?? music.subtitle ?? "MUSIC",
        duration: music.duration,
        id: music.id,
        name: music.title,
        url: music.audioUrl ?? "",
      },
    });
  };
  const openRecommendation = (item: RecommendationItem) => {
    navigation.navigate("MusicPlayer", {
      music: {
        description: item.description ?? item.meta,
        duration: item.duration,
        id: item.id,
        name: item.title,
        url: item.audioUrl ?? "",
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
          <Text style={styleSheet.title}>{title}</Text>
          <Text style={styleSheet.subtitle}>{subtitle}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.86}
          onPress={() => openPlayer(featured)}
          style={styleSheet.dailyCard}
        >
          <View>
            <Text style={styleSheet.dailyTitle}>{featured.title}</Text>
            <Text style={styleSheet.dailySubtitle}>{featured.subtitle}</Text>
          </View>
          <View style={styleSheet.playButton}>
            <Text style={styleSheet.playButtonText}>
              {featured.buttonLabel}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styleSheet.cardsRow}>
          {cards.map((card) => (
            <MusicCard
              key={card.courseID}
              {...card}
              onPress={() => openPlayer(card)}
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
    minHeight: 210,
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
      lineHeight: 24,
      marginTop: 8,
    },
    dailyCard: {
      alignItems: "center",
      backgroundColor: "#8E97FD",
      borderRadius: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
      minHeight: 110,
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
      fontSize: 20,
      fontWeight: "700",
    },
    cardsRow: {
      flexDirection: "row",
      gap: 16,
      marginBottom: 28,
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

export default MusicScreen;
