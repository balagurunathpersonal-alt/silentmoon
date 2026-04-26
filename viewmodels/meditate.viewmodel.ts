import { useEffect, useState } from "react";
import { Image } from "react-native";
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
    title: "Meditate",
    subtitle:
      "Explore guided practices to calm your mind, build focus, and return to yourself.",
    featured: {
      backgroundColor: "#F2F3F7",
      buttonLabel: "PLAY",
      description:
        "A balanced daily practice with breath guidance, gentle awareness, and a short reset for a calmer mind.",
      duration: "3-10 MIN",
      favoriteCount: "31,482 Favorites",
      heroImageUrl: meditationHeroImageUrl,
      id: "course-daily-calm",
      image: require("../assets/images/meditation.png"),
      listeningCount: "42,875 Listening",
      narratorSessions: {
        female: [
          {
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
            duration: "10 MIN",
            title: "Morning Grounding",
          },
          {
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
            duration: "7 MIN",
            title: "Soft Awareness",
          },
          {
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
            duration: "5 MIN",
            title: "Gentle Reset",
          },
        ],
        male: [
          {
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
            duration: "10 MIN",
            title: "Daily Centering",
          },
          {
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
            duration: "8 MIN",
            title: "Returning to Breath",
          },
          {
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
            duration: "6 MIN",
            title: "Clear Mind Pause",
          },
        ],
      },
      subtitle: "MEDITATION - 3-10 MIN",
      textColor: "#3F414E",
      title: "Daily Calm",
    },
    cards: [
      {
        backgroundColor: "#8E97FD",
        description:
          "A practical course for learning posture, breath rhythm, and simple mindful noticing without pressure.",
        duration: "10 MIN",
        favoriteCount: "22,108 Favorites",
        heroImageUrl: meditationHeroImageUrl,
        id: "course-mindful-basics",
        listeningCount: "36,440 Listening",
        narratorSessions: {
          female: [
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
              duration: "10 MIN",
              title: "Starting Where You Are",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
              duration: "8 MIN",
              title: "The Gentle Anchor",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
              duration: "6 MIN",
              title: "Thoughts Passing By",
            },
          ],
          male: [
            {
              audioUrl:
                "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
              duration: "10 MIN",
              title: "Mindful Foundations",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
              duration: "7 MIN",
              title: "Sitting with Ease",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
              duration: "5 MIN",
              title: "Quiet Observation",
            },
          ],
        },
        subtitle: "COURSE",
        title: "Mindful Basics",
      },
      {
        backgroundColor: "#FFC97E",
        description:
          "Short guided sessions that use the breath as a steady point of focus for busy or scattered moments.",
        duration: "7 MIN",
        favoriteCount: "19,556 Favorites",
        heroImageUrl: focusHeroImageUrl,
        id: "course-breath-focus",
        listeningCount: "29,014 Listening",
        narratorSessions: {
          female: [
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
              duration: "7 MIN",
              title: "Counting the Breath",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
              duration: "6 MIN",
              title: "Focus in Motion",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              duration: "5 MIN",
              title: "One Breath at a Time",
            },
          ],
          male: [
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              duration: "7 MIN",
              title: "Breath as Anchor",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
              duration: "8 MIN",
              title: "Steady Attention",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
              duration: "5 MIN",
              title: "Reset Your Focus",
            },
          ],
        },
        subtitle: "GUIDED",
        textColor: "#3F414E",
        title: "Breath Focus",
      },
    ] satisfies ActionCard[],
    sectionTitle: "Recommended for you",
    recommendations: recommendations,
  };
};
