import { useEffect, useState } from "react";
import { getRecommendations } from "../services/recommendation-service";
import { useTheme } from "../themes/theme-context";
import { ActionCard, RecommendationItem } from "./tab.types";

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
    title: "Sleep Stories",
    subtitle:
      "Soothing bedtime stories to help you fall into a deep and natural sleep",
    featured: {
      buttonLabel: "PLAY",
      image: require("../assets/images/sleep.png"),
      meta: "Ease your mind",
      subtitle: "MEDITATION - 12 MIN",
      title: "Tonight's Sleep",
    },
    cards: [
      {
        backgroundColor: "#8E97FD",
        duration: "18 MIN",
        subtitle: "SLEEP MUSIC",
        title: "Night Island",
      },
      {
        backgroundColor: "#FAE8B8",
        duration: "10 MIN",
        subtitle: "SLEEPCAST",
        textColor: "#3F414E",
        title: "Sweet Sleep",
      },
    ] satisfies ActionCard[],
    sectionTitle: "Popular Sleep Stories",
    recommendations: recommendations,
  };
};
