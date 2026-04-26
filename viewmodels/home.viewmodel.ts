import { useEffect, useState } from "react";
import { Image } from "react-native";
import BasicsBG from "../assets/images/svg/basicsbg.svg";
import RelaxBG from "../assets/images/svg/relaxBG.svg";
import { useAuth } from "../services/auth-context";
import { getRecommendations } from "../services/recommendation-service";
import { useTheme } from "../themes/theme-context";
import { ActionCard, RecommendationItem } from "./tab.types";

const basicsHeroImageUrl = Image.resolveAssetSource(
  require("../assets/images/course-details-hero.png"),
).uri;
const relaxationHeroImageUrl = Image.resolveAssetSource(
  require("../assets/images/relaxation.png"),
).uri;

const getFirstName = (name?: string, email?: string) => {
  const fallbackName = email?.split("@")[0];
  const displayName = name?.trim() || fallbackName || "Friend";

  return displayName.split(/\s+/)[0];
};

const getGreetingContent = (name: string) => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return {
      greeting: `Good Morning, ${name}`,
      subtitle: "Begin gently and give your mind a calm start.",
    };
  }

  if (hour < 17) {
    return {
      greeting: `Good Afternoon, ${name}`,
      subtitle: "Pause for a breath and reset the rest of your day.",
    };
  }

  return {
    greeting: `Good Night, ${name}`,
    subtitle: "Let the day soften and ease yourself into rest.",
  };
};

export const useHomeViewModel = () => {
  const base = useHomeViewModelBase();
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(
    base.recommendations,
  );

  useEffect(() => {
    let mounted = true;
    getRecommendations("home", 6).then((items) => {
      if (mounted) setRecommendations(items as any);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return { ...base, recommendations };
};

// keep the old export shape as a factory for the base values used before async fetch
const useHomeViewModelBase = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { greeting, subtitle } = getGreetingContent(
    getFirstName(user?.name, user?.email),
  );

  return {
    theme,
    greeting,
    subtitle,
    courses: [
      {
        backgroundColor: "#8E97FD",
        backgroundImage: BasicsBG,
        description:
          "A gentle introduction to breath, posture, and simple awareness practices for building a steady meditation habit.",
        duration: "3-10 MIN",
        favoriteCount: "24,234 Favorites",
        heroImageUrl: basicsHeroImageUrl,
        id: "course-basics",
        listeningCount: "34,234 Listening",
        narratorSessions: {
          female: [
            {
              audioUrl:
                "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
              duration: "10 MIN",
              title: "The Rhythm of Breath",
            },
            {
              audioUrl: "https://filesamples.com/samples/audio/mp3/sample1.mp3",
              duration: "7 MIN",
              title: "Finding Stillness",
            },
            {
              audioUrl: "https://filesamples.com/samples/audio/mp3/sample2.mp3",
              duration: "5 MIN",
              title: "Open Awareness",
            },
          ],
          male: [
            {
              audioUrl: "https://filesamples.com/samples/audio/mp3/sample3.mp3",
              duration: "10 MIN",
              title: "Foundations of Calm",
            },
            {
              audioUrl: "https://filesamples.com/samples/audio/mp3/sample4.mp3",
              duration: "8 MIN",
              title: "Navigating Thoughts",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              duration: "5 MIN",
              title: "The Power of Pause",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
              duration: "12 MIN",
              title: "Body-Centered Focus",
            },
          ],
        },
        subtitle: "COURSE",
        title: "Basics",
      },
      {
        backgroundColor: "#FFC97E",
        backgroundImage: RelaxBG,
        description:
          "Soft soundscapes and calming prompts to help your body release tension and move into a quieter state.",
        duration: "3-10 MIN",
        favoriteCount: "18,912 Favorites",
        heroImageUrl: relaxationHeroImageUrl,
        id: "course-relaxation",
        listeningCount: "28,440 Listening",
        narratorSessions: {
          female: [
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
              duration: "15 MIN",
              title: "Midnight Drift",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              duration: "10 MIN",
              title: "Tension Melting",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              duration: "8 MIN",
              title: "Starlight Visualization",
            },
          ],
          male: [
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
              duration: "12 MIN",
              title: "Deep Physical Release",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
              duration: "10 MIN",
              title: "Echoes of Silence",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
              duration: "5 MIN",
              title: "Quick Calm Down",
            },
          ],
        },
        subtitle: "MUSIC",
        textColor: "#3F414E",
        title: "Relaxation",
      },
    ] satisfies ActionCard[],
    dailyThought: {
      buttonLabel: "PLAY",
      subtitle: "MEDITATION - 3-10 MIN",
      title: "Daily Thought",
    },
    sectionTitle: "Recommended for you",
    recommendations: [] satisfies RecommendationItem[],
  };
};
