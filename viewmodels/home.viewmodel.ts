import { useEffect, useState } from "react";
import { Image } from "react-native";
import BasicsBG from "../assets/images/svg/basicsbg.svg";
import RelaxBG from "../assets/images/svg/relaxBG.svg";
import { COURSE_CONTENT } from "../constants/course-content";
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
  const displayName =
    name?.trim() || fallbackName || COURSE_CONTENT.home.fallbackName;

  return displayName.split(/\s+/)[0];
};

const getGreetingContent = (name: string) => {
  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? COURSE_CONTENT.home.greetings.morning
      : hour < 17
        ? COURSE_CONTENT.home.greetings.afternoon
        : COURSE_CONTENT.home.greetings.night;

  return {
    greeting: `${greeting.title}, ${name}`,
    subtitle: greeting.subtitle,
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
        ...COURSE_CONTENT.home.courses.basics,
        backgroundImage: BasicsBG,
        heroImageUrl: basicsHeroImageUrl,
      },
      {
        ...COURSE_CONTENT.home.courses.relaxation,
        backgroundImage: RelaxBG,
        heroImageUrl: relaxationHeroImageUrl,
      },
    ] satisfies ActionCard[] as ActionCard[],
    dailyThought: COURSE_CONTENT.home.dailyThought,
    sectionTitle: COURSE_CONTENT.common.recommendedForYou,
    recommendations: [] satisfies RecommendationItem[],
  };
};
