import { useEffect, useState } from "react";
import { getRecommendations } from "../services/recommendation-service";
import { useTheme } from "../themes/theme-context";
import { ActionCard, RecommendationItem } from "./tab.types";

export const useMusicViewModel = () => {
  const { theme } = useTheme();
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(
    [],
  );

  useEffect(() => {
    let mounted = true;
    getRecommendations("music", 6).then((items) => {
      if (mounted) setRecommendations(items as any);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return {
    theme,
    title: "Music",
    subtitle:
      "Calm tracks and gentle soundscapes for focus, rest, and relaxation.",
    featured: {
      buttonLabel: "PLAY",
      subtitle: "MUSIC - 15 MIN",
      title: "Peaceful Piano",
    },
    cards: [
      {
        backgroundColor: "#333242",
        duration: "20 MIN",
        subtitle: "MUSIC",
        title: "Deep Focus",
      },
      {
        backgroundColor: "#AFDBC5",
        duration: "12 MIN",
        subtitle: "AMBIENT",
        textColor: "#3F414E",
        title: "Soft Rain",
      },
    ] satisfies ActionCard[],
    sectionTitle: "Recommended tracks",
    recommendations: recommendations,
  };
};
