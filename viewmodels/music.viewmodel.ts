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
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      buttonLabel: "PLAY",
      description:
        "A calm piano soundscape designed to soften attention and settle the mind.",
      duration: "45:00",
      id: "music-peaceful-piano",
      subtitle: "MUSIC - 15 MIN",
      title: "Peaceful Piano",
    },
    cards: [
      {
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        backgroundColor: "#333242",
        description:
          "Warm ambient layers for focus, study, and quiet concentration.",
        duration: "20 MIN",
        id: "music-deep-focus",
        subtitle: "MUSIC",
        title: "Deep Focus",
      },
      {
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        backgroundColor: "#AFDBC5",
        description:
          "Gentle rainfall and low textures to help the body unwind.",
        duration: "12 MIN",
        id: "music-soft-rain",
        subtitle: "AMBIENT",
        textColor: "#3F414E",
        title: "Soft Rain",
      },
    ] satisfies ActionCard[],
    sectionTitle: "Recommended tracks",
    recommendations: recommendations,
  };
};
