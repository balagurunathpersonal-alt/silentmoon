import { Feather } from "@expo/vector-icons";
import { ImageSourcePropType } from "react-native";
import type { SvgProps } from "react-native-svg";
import { CourseSession } from "../types/navigation";
export type MainTabName = "Home" | "Sleep" | "Meditate" | "Music" | "Profile";
export type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

export type ActionCard = {
  backgroundColor: string;
  backgroundImage?: React.ComponentType<SvgProps>;
  description?: string;
  duration: string;
  favoriteCount?: string;
  heroImageUrl?: string;
  lessons?: string[];
  listeningCount?: string;
  narratorSessions?: {
    female: CourseSession[];
    male: CourseSession[];
  };
  subtitle: string;
  textColor?: string;
  title: string;
};

export type RecommendationItem = {
  artColor?: string;
  image?: ImageSourcePropType;
  meta: string;
  title: string;
};
