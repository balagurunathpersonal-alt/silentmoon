import { useEffect, useState } from "react";
import { Image } from "react-native";
import { COURSE_CONTENT } from "../constants/course-content";
import { getRecommendations } from "../services/recommendation-service";
import { useTheme } from "../themes/theme-context";
import { ActionCard, RecommendationItem } from "./tab.types";

const meditationHeroImageUrl = Image.resolveAssetSource(
  require("../assets/images/meditation.png"),
).uri;
const focusHeroImageUrl = Image.resolveAssetSource(
  require("../assets/images/focus.png"),
).uri;

export const useMeditateViewModel = () => {
  const { theme } = useTheme();
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(
    [],
  );

  useEffect(() => {
    let mounted = true;
    getRecommendations("meditate", 6).then((items) => {
      if (mounted) setRecommendations(items as any);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return {
    theme,
    title: COURSE_CONTENT.meditate.title,
    subtitle: COURSE_CONTENT.meditate.subtitle,
    featured: {
      ...COURSE_CONTENT.meditate.featured,
      heroImageUrl: meditationHeroImageUrl,
      image: require("../assets/images/meditation.png"),
    },
    cards: [
      {
        ...COURSE_CONTENT.meditate.cards.mindfulBasics,
        heroImageUrl: meditationHeroImageUrl,
      },
      {
        ...COURSE_CONTENT.meditate.cards.breathFocus,
        heroImageUrl: focusHeroImageUrl,
      },
    ] satisfies ActionCard[],
    sectionTitle: COURSE_CONTENT.common.recommendedForYou,
    recommendations: recommendations,
  };
};
