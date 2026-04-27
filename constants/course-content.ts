import type { ActionCard } from "../viewmodels/tab.types";

type CourseContent = Omit<ActionCard, "backgroundImage" | "heroImageUrl">;
type FeaturedCourseContent = CourseContent & {
  buttonLabel: string;
  meta?: string;
};

type MusicTrackContent = Omit<ActionCard, "backgroundImage" | "heroImageUrl">;

export const COURSE_CONTENT = {
  common: {
    playButtonLabel: "PLAY",
    recommendedForYou: "Recommended for you",
  },
  home: {
    fallbackName: "Friend",
    greetings: {
      morning: {
        title: "Good Morning",
        subtitle: "Begin gently and give your mind a calm start.",
      },
      afternoon: {
        title: "Good Afternoon",
        subtitle: "Pause for a breath and reset the rest of your day.",
      },
      night: {
        title: "Good Night",
        subtitle: "Let the day soften and ease yourself into rest.",
      },
    },
    courses: {
      basics: {
        backgroundColor: "#8E97FD",
        description:
          "A gentle introduction to breath, posture, and simple awareness practices for building a steady meditation habit.",
        duration: "3-10 MIN",
        favoriteCount: "24,234 Favorites",
        courseID: "course-basics",
        listeningCount: "34,234 Listening",
        narratorSessions: {
          female: [
            {
              courseSessionID: "course-basics-the-rhythm-of-breath",
              audioUrl:
                "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
              duration: "10 MIN",
              title: "The Rhythm of Breath",
            },
            {
              courseSessionID: "course-basics-finding-stillness",
              audioUrl: "https://filesamples.com/samples/audio/mp3/sample1.mp3",
              duration: "7 MIN",
              title: "Finding Stillness",
            },
            {
              courseSessionID: "course-basics-open-awareness",
              audioUrl: "https://filesamples.com/samples/audio/mp3/sample2.mp3",
              duration: "5 MIN",
              title: "Open Awareness",
            },
          ],
          male: [
            {
              courseSessionID: "course-basics-foundations-of-calm",
              audioUrl: "https://filesamples.com/samples/audio/mp3/sample3.mp3",
              duration: "10 MIN",
              title: "Foundations of Calm",
            },
            {
              courseSessionID: "course-basics-navigating-thoughts",
              audioUrl: "https://filesamples.com/samples/audio/mp3/sample4.mp3",
              duration: "8 MIN",
              title: "Navigating Thoughts",
            },
            {
              courseSessionID: "course-basics-the-power-of-pause",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              duration: "5 MIN",
              title: "The Power of Pause",
            },
            {
              courseSessionID: "course-basics-body-centered-focus",
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
      relaxation: {
        backgroundColor: "#FFC97E",
        description:
          "Soft soundscapes and calming prompts to help your body release tension and move into a quieter state.",
        duration: "3-10 MIN",
        favoriteCount: "18,912 Favorites",
        courseID: "course-relaxation",
        listeningCount: "28,440 Listening",
        narratorSessions: {
          female: [
            {
              courseSessionID: "course-relaxation-midnight-drift",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
              duration: "15 MIN",
              title: "Midnight Drift",
            },
            {
              courseSessionID: "course-relaxation-tension-melting",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              duration: "10 MIN",
              title: "Tension Melting",
            },
            {
              courseSessionID: "course-relaxation-starlight-visualization",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              duration: "8 MIN",
              title: "Starlight Visualization",
            },
          ],
          male: [
            {
              courseSessionID: "course-relaxation-deep-physical-release",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
              duration: "12 MIN",
              title: "Deep Physical Release",
            },
            {
              courseSessionID: "course-relaxation-echoes-of-silence",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
              duration: "10 MIN",
              title: "Echoes of Silence",
            },
            {
              courseSessionID: "course-relaxation-quick-calm-down",
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
    } satisfies Record<string, CourseContent>,
    dailyThought: {
      buttonLabel: "PLAY",
      subtitle: "MEDITATION - 3-10 MIN",
      title: "Daily Thought",
    },
  },
  meditate: {
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
      courseID: "course-daily-calm",
      listeningCount: "42,875 Listening",
      narratorSessions: {
        female: [
          {
            courseSessionID: "course-daily-calm-morning-grounding",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
            duration: "10 MIN",
            title: "Morning Grounding",
          },
          {
            courseSessionID: "course-daily-calm-soft-awareness",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
            duration: "7 MIN",
            title: "Soft Awareness",
          },
          {
            courseSessionID: "course-daily-calm-gentle-reset",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
            duration: "5 MIN",
            title: "Gentle Reset",
          },
        ],
        male: [
          {
            courseSessionID: "course-daily-calm-daily-centering",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
            duration: "10 MIN",
            title: "Daily Centering",
          },
          {
            courseSessionID: "course-daily-calm-returning-to-breath",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
            duration: "8 MIN",
            title: "Returning to Breath",
          },
          {
            courseSessionID: "course-daily-calm-clear-mind-pause",
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
    } satisfies FeaturedCourseContent,
    cards: {
      mindfulBasics: {
        backgroundColor: "#8E97FD",
        description:
          "A practical course for learning posture, breath rhythm, and simple mindful noticing without pressure.",
        duration: "10 MIN",
        favoriteCount: "22,108 Favorites",
        courseID: "course-mindful-basics",
        listeningCount: "36,440 Listening",
        narratorSessions: {
          female: [
            {
              courseSessionID: "course-mindful-basics-starting-where-you-are",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
              duration: "10 MIN",
              title: "Starting Where You Are",
            },
            {
              courseSessionID: "course-mindful-basics-the-gentle-anchor",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
              duration: "8 MIN",
              title: "The Gentle Anchor",
            },
            {
              courseSessionID: "course-mindful-basics-thoughts-passing-by",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
              duration: "6 MIN",
              title: "Thoughts Passing By",
            },
          ],
          male: [
            {
              courseSessionID: "course-mindful-basics-mindful-foundations",
              audioUrl:
                "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
              duration: "10 MIN",
              title: "Mindful Foundations",
            },
            {
              courseSessionID: "course-mindful-basics-sitting-with-ease",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
              duration: "7 MIN",
              title: "Sitting with Ease",
            },
            {
              courseSessionID: "course-mindful-basics-quiet-observation",
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
      breathFocus: {
        backgroundColor: "#FFC97E",
        description:
          "Short guided sessions that use the breath as a steady point of focus for busy or scattered moments.",
        duration: "7 MIN",
        favoriteCount: "19,556 Favorites",
        courseID: "course-breath-focus",
        listeningCount: "29,014 Listening",
        narratorSessions: {
          female: [
            {
              courseSessionID: "course-breath-focus-counting-the-breath",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
              duration: "7 MIN",
              title: "Counting the Breath",
            },
            {
              courseSessionID: "course-breath-focus-focus-in-motion",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
              duration: "6 MIN",
              title: "Focus in Motion",
            },
            {
              courseSessionID: "course-breath-focus-one-breath-at-a-time",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              duration: "5 MIN",
              title: "One Breath at a Time",
            },
          ],
          male: [
            {
              courseSessionID: "course-breath-focus-breath-as-anchor",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              duration: "7 MIN",
              title: "Breath as Anchor",
            },
            {
              courseSessionID: "course-breath-focus-steady-attention",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
              duration: "8 MIN",
              title: "Steady Attention",
            },
            {
              courseSessionID: "course-breath-focus-reset-your-focus",
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
    } satisfies Record<string, CourseContent>,
  },
  sleep: {
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
      courseID: "course-tonights-sleep",
      listeningCount: "51,632 Listening",
      meta: "Ease your mind",
      narratorSessions: {
        female: [
          {
            courseSessionID: "course-tonights-sleep-moonlit-wind-down",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
            duration: "12 MIN",
            title: "Moonlit Wind Down",
          },
          {
            courseSessionID: "course-tonights-sleep-letting-the-day-go",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
            duration: "10 MIN",
            title: "Letting the Day Go",
          },
          {
            courseSessionID: "course-tonights-sleep-soft-sleep-breath",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
            duration: "8 MIN",
            title: "Soft Sleep Breath",
          },
        ],
        male: [
          {
            courseSessionID: "course-tonights-sleep-evening-stillness",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
            duration: "12 MIN",
            title: "Evening Stillness",
          },
          {
            courseSessionID: "course-tonights-sleep-heavy-eyes",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
            duration: "10 MIN",
            title: "Heavy Eyes",
          },
          {
            courseSessionID: "course-tonights-sleep-restful-descent",
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
    } satisfies FeaturedCourseContent,
    cards: {
      nightIsland: {
        backgroundColor: "#8E97FD",
        description:
          "Dreamy ambient music and quiet narration for easing into a slower nighttime rhythm.",
        duration: "18 MIN",
        favoriteCount: "27,650 Favorites",
        courseID: "course-night-island",
        listeningCount: "39,102 Listening",
        narratorSessions: {
          female: [
            {
              courseSessionID: "course-night-island-island-at-night",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
              duration: "18 MIN",
              title: "Island at Night",
            },
            {
              courseSessionID: "course-night-island-waves-in-the-dark",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
              duration: "12 MIN",
              title: "Waves in the Dark",
            },
            {
              courseSessionID: "course-night-island-distant-shore",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3",
              duration: "9 MIN",
              title: "Distant Shore",
            },
          ],
          male: [
            {
              courseSessionID: "course-night-island-night-island-story",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
              duration: "18 MIN",
              title: "Night Island Story",
            },
            {
              courseSessionID: "course-night-island-lantern-path",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              duration: "14 MIN",
              title: "Lantern Path",
            },
            {
              courseSessionID: "course-night-island-the-quiet-coast",
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
      sweetSleep: {
        backgroundColor: "#FAE8B8",
        description:
          "A light sleepcast with gentle pacing, cozy imagery, and soft transitions toward rest.",
        duration: "10 MIN",
        favoriteCount: "21,993 Favorites",
        courseID: "course-sweet-sleep",
        listeningCount: "33,781 Listening",
        narratorSessions: {
          female: [
            {
              courseSessionID: "course-sweet-sleep-cozy-room",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
              duration: "10 MIN",
              title: "Cozy Room",
            },
            {
              courseSessionID: "course-sweet-sleep-warm-blanket",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
              duration: "8 MIN",
              title: "Warm Blanket",
            },
            {
              courseSessionID: "course-sweet-sleep-sleepy-window",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              duration: "6 MIN",
              title: "Sleepy Window",
            },
          ],
          male: [
            {
              courseSessionID: "course-sweet-sleep-sweet-sleep-story",
              audioUrl:
                "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
              duration: "10 MIN",
              title: "Sweet Sleep Story",
            },
            {
              courseSessionID: "course-sweet-sleep-dream-garden",
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              duration: "8 MIN",
              title: "Dream Garden",
            },
            {
              courseSessionID: "course-sweet-sleep-almost-asleep",
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
    } satisfies Record<string, CourseContent>,
    sectionTitle: "Popular Sleep Stories",
  },
  music: {
    title: "Music",
    subtitle:
      "Calm tracks and gentle soundscapes for focus, rest, and relaxation.",
    featured: {
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      backgroundColor: "#000000",
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
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        backgroundColor: "#333242",
        description:
          "Warm ambient layers for focus, study, and quiet concentration.",
        duration: "20 MIN",
        courseID: "music-deep-focus",
        subtitle: "MUSIC",
        title: "Deep Focus",
      },
      {
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        backgroundColor: "#AFDBC5",
        description:
          "Gentle rainfall and low textures to help the body unwind.",
        duration: "12 MIN",
        courseID: "music-soft-rain",
        subtitle: "AMBIENT",
        textColor: "#3F414E",
        title: "Soft Rain",
      },
    ] satisfies MusicTrackContent[],
    sectionTitle: "Recommended tracks",
  },
} as const;
