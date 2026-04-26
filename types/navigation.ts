import type { StackNavigationProp } from "@react-navigation/stack";

export type AuthMode = "signin" | "signup";

export type CourseSession = {
  duration: string;
  title: string;
  audioUrl: string;
};

export type CourseDetailParams = {
  backgroundColor: string;
  description: string;
  duration: string;
  favoriteCount?: string;
  heroImageUrl?: string;
  id?: string;
  listeningCount?: string;
  narratorSessions?: {
    female: CourseSession[];
    male: CourseSession[];
  };
  subtitle: string;
  textColor?: string;
  title: string;
};

export type MusicPlayerParams = {
  name: string;
  description: string;
  url: string;
  duration?: string;
  id?: string;
};

export type RootStackParamList = {
  Landing: undefined;
  OAuth:
    | {
        userId?: string | string[];
        secret?: string | string[];
        error?: string | string[];
      }
    | undefined;
  SignIn: { mode?: AuthMode } | undefined;
  Welcome: undefined;
  Topics: undefined;
  Reminder:
    | {
        topicId?: string;
        topicTitle?: string;
        topic?: string;
      }
    | undefined;
  MainTabs: undefined;
  CourseDetail: { course: CourseDetailParams };
  MusicPlayer: { music: MusicPlayerParams };
};

export type RootNavigationProp = StackNavigationProp<RootStackParamList>;
