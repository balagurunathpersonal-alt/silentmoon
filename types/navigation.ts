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
  listeningCount?: string;
  narratorSessions?: {
    female: CourseSession[];
    male: CourseSession[];
  };
  subtitle: string;
  textColor?: string;
  title: string;
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
};

export type RootNavigationProp = StackNavigationProp<RootStackParamList>;
