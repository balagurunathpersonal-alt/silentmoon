import { useEffect, useState } from "react";
import { Image } from "react-native";
import { COURSE_CONTENT } from "../constants/course-content";
import { getRecommendations } from "../services/recommendation-service";
import { useTheme } from "../themes/theme-context";
import { ActionCard, RecommendationItem } from "./tab.types";

const sleepHeroImageUrl = Image.resolveAssetSource(
  require("../assets/images/sleep.png"),
).uri;
const relaxationHeroImageUrl = Image.resolveAssetSource(
  require("../assets/images/relaxation.png"),
).uri;

export const useSleepViewModel = () => {
  const { theme } = useTheme();
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(
    [],
  );

  useEffect(() => {
    let mounted = true;
    getRecommendations("sleep", 6).then((items) => {
      if (mounted) setRecommendations(items as any);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return {
    theme,
    title: COURSE_CONTENT.sleep.title,
    subtitle: COURSE_CONTENT.sleep.subtitle,
    featured: {
      ...COURSE_CONTENT.sleep.featured,
      heroImageUrl: sleepHeroImageUrl,
      image: require("../assets/images/sleep.png"),
    },
    cards: [
      {
        ...COURSE_CONTENT.sleep.cards.nightIsland,
        heroImageUrl: sleepHeroImageUrl,
      },
      {
        ...COURSE_CONTENT.sleep.cards.sweetSleep,
        heroImageUrl: relaxationHeroImageUrl,
      },
    ] satisfies ActionCard[],
    sectionTitle: COURSE_CONTENT.sleep.sectionTitle,
    recommendations: recommendations,
  };
};
