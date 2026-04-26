import { useEffect, useState } from "react";
import { COURSE_CONTENT } from "../constants/course-content";
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
    title: COURSE_CONTENT.music.title,
    subtitle: COURSE_CONTENT.music.subtitle,
    featured: COURSE_CONTENT.music.featured,
    cards: COURSE_CONTENT.music.cards satisfies ActionCard[],
    sectionTitle: COURSE_CONTENT.music.sectionTitle,
    recommendations: recommendations,
  };
};
