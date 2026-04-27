import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainTabName } from "../viewmodels/tab.types";

export type AuthMode = "signin" | "signup";

export type CourseSession = {
  id?: string;
  courseSessionID?: string;
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
  courseID?: string;
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

export type ReminderTopicParams = {
  id?: string;
  title: string;
};

export type RootStackParamList = {
  Landing: undefined;
  SignIn: { mode?: AuthMode } | undefined;
  Welcome: undefined;
  Topics:
    | {
        reminderReturnTo?: "Profile";
      }
    | undefined;
  Reminder:
    | {
        reminderReturnTo?: "Profile";
        topicId?: string;
        topicTitle?: string;
        topic?: string;
        selectedTopic?: ReminderTopicParams;
      }
    | undefined;
  MainTabs:
    | {
        screen?: MainTabName;
      }
    | undefined;
  CourseDetail: { course: CourseDetailParams };
  MusicPlayer: { music: MusicPlayerParams };
};

export type RootNavigationProp = StackNavigationProp<RootStackParamList>;
