import { useEffect, useState } from "react";
import { Image } from "react-native";
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
    title: "Sleep Stories",
    subtitle:
      "Soothing bedtime stories to help you fall into a deep and natural sleep",
    featured: {
      backgroundColor: "#F5F5FF",
      buttonLabel: "PLAY",
      description:
        "A soothing bedtime sequence with slow prompts and soft imagery to help the day fade out.",
      duration: "12 MIN",
      favoriteCount: "38,214 Favorites",
      heroImageUrl: sleepHeroImageUrl,
      id: "course-tonights-sleep",
      image: require("../assets/images/sleep.png"),
      listeningCount: "51,632 Listening",
      meta: "Ease your mind",
      narratorSessions: {
        female: [
          {
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
            duration: "12 MIN",
            title: "Moonlit Wind Down",
          },
          {
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
            duration: "10 MIN",
            title: "Letting the Day Go",
          },
          {
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
            duration: "8 MIN",
            title: "Soft Sleep Breath",
          },
        ],
        male: [
          {
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
            duration: "12 MIN",
            title: "Evening Stillness",
          },
          {
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
            duration: "10 MIN",
            title: "Heavy Eyes",
          },
          {
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
            duration: "7 MIN",
            title: "Restful Descent",
          },
        ],
      },
      subtitle: "MEDITATION - 12 MIN",
      textColor: "#3F414E",
      title: "Tonight's Sleep",
    },
    cards: [
      {
        backgroundColor: "#8E97FD",
        description:
          "Dreamy ambient music and quiet narration for easing into a slower nighttime rhythm.",
        duration: "18 MIN",
        favoriteCount: "27,650 Favorites",
        heroImageUrl: sleepHeroImageUrl,
        id: "course-night-island",
        listeningCount: "39,102 Listening",
        narratorSessions: {
          female: [
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
              duration: "18 MIN",
              title: "Island at Night",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
              duration: "12 MIN",
              title: "Waves in the Dark",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3",
              duration: "9 MIN",
              title: "Distant Shore",
            },
          ],
          male: [
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
              duration: "18 MIN",
              title: "Night Island Story",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              duration: "14 MIN",
              title: "Lantern Path",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
              duration: "10 MIN",
              title: "The Quiet Coast",
            },
          ],
        },
        subtitle: "SLEEP MUSIC",
        title: "Night Island",
      },
      {
        backgroundColor: "#FAE8B8",
        description:
          "A light sleepcast with gentle pacing, cozy imagery, and soft transitions toward rest.",
        duration: "10 MIN",
        favoriteCount: "21,993 Favorites",
        heroImageUrl: relaxationHeroImageUrl,
        id: "course-sweet-sleep",
        listeningCount: "33,781 Listening",
        narratorSessions: {
          female: [
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
              duration: "10 MIN",
              title: "Cozy Room",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
              duration: "8 MIN",
              title: "Warm Blanket",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              duration: "6 MIN",
              title: "Sleepy Window",
            },
          ],
          male: [
            {
              audioUrl:
                "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
              duration: "10 MIN",
              title: "Sweet Sleep Story",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              duration: "8 MIN",
              title: "Dream Garden",
            },
            {
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
              duration: "5 MIN",
              title: "Almost Asleep",
            },
          ],
        },
        subtitle: "SLEEPCAST",
        textColor: "#3F414E",
        title: "Sweet Sleep",
      },
    ] satisfies ActionCard[],
    sectionTitle: "Popular Sleep Stories",
    recommendations: recommendations,
  };
};
