import { useEffect, useState } from "react";
import { getRecommendations } from "../services/recommendation-service";
import { useTheme } from "../themes/theme-context";
import { ActionCard, RecommendationItem } from "./tab.types";

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
    title: "Meditate",
    subtitle:
      "Explore guided practices to calm your mind, build focus, and return to yourself.",
    featured: {
      buttonLabel: "PLAY",
      image: require("../assets/images/meditation.png"),
      subtitle: "MEDITATION - 3-10 MIN",
      title: "Daily Calm",
    },
    cards: [
      {
        backgroundColor: "#8E97FD",
        duration: "10 MIN",
        subtitle: "COURSE",
        title: "Mindful Basics",
      },
      {
        backgroundColor: "#FFC97E",
        duration: "7 MIN",
        subtitle: "GUIDED",
        textColor: "#3F414E",
        title: "Breath Focus",
      },
    ] satisfies ActionCard[],
    sectionTitle: "Recommended for you",
    recommendations: recommendations,
  };
};
