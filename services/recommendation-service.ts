const shuffle = <T>(arr: T[]) => {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export type RecItem = {
  id: string;
  title: string;
  meta?: string;
  artColor?: string;
  audioUrl?: string;
  description?: string;
  duration?: string;
  image?: any;
};

const homeRecommendations: RecItem[] = [
  {
    artColor: "#AFDBC5",
    description:
      "A short focus practice to steady attention and begin the day with a clear mind.",
    duration: "10 MIN",
    id: "home-morning-focus",
    meta: "MEDITATION • 10 MIN",
    title: "Morning Focus",
  },
  {
    artColor: "#FAE8B8",
    description:
      "A week-long course for noticing small moments of ease, gratitude, and joy.",
    duration: "7 DAYS",
    id: "home-happiness-habit",
    meta: "COURSE • 7 DAYS",
    title: "Happiness Habit",
  },
  {
    artColor: "#FFC97E",
    description:
      "Warm music and gentle prompts for loosening tension through the body.",
    duration: "15 MIN",
    id: "home-golden-relaxation",
    meta: "MUSIC • 15 MIN",
    title: "Golden Relaxation",
  },
  {
    artColor: "#8E97FD",
    description:
      "A quick guided reset built around slow breathing and relaxed awareness.",
    duration: "5 MIN",
    id: "home-breath-reset",
    meta: "GUIDED • 5 MIN",
    title: "Breath Reset",
  },
  {
    artColor: "#E0D7FF",
    description:
      "A soft evening wind-down practice to help your nervous system settle.",
    duration: "12 MIN",
    id: "home-evening-unwind",
    meta: "SLEEP • 12 MIN",
    title: "Evening Unwind",
  },
  {
    artColor: "#B9E6F2",
    description:
      "A gentle confidence practice for returning to yourself before a busy moment.",
    duration: "8 MIN",
    id: "home-calm-confidence",
    meta: "PRACTICE • 8 MIN",
    title: "Calm Confidence",
  },
];

const meditateRecommendations: RecItem[] = [
  {
    image: require("../assets/images/focus.png"),
    description:
      "Train attention with a calm anchor and simple return-to-focus prompts.",
    duration: "10 MIN",
    id: "meditate-focused-attention",
    meta: "MEDITATION • 10 MIN",
    title: "Focused Attention",
  },
  {
    image: require("../assets/images/calm.png"),
    description:
      "A quiet practice for slowing thoughts and softening the body.",
    duration: "8 MIN",
    id: "meditate-calm-mind",
    meta: "PRACTICE • 8 MIN",
    title: "Calm Mind",
  },
  {
    image: require("../assets/images/relaxation.png"),
    description:
      "A guided body relaxation to release held tension from head to toe.",
    duration: "12 MIN",
    id: "meditate-body-relaxation",
    meta: "GUIDED • 12 MIN",
    title: "Body Relaxation",
  },
  {
    image: require("../assets/images/happiness.png"),
    description:
      "A five-day gratitude course for making positive attention easier to access.",
    duration: "5 DAYS",
    id: "meditate-gratitude-practice",
    meta: "COURSE • 5 DAYS",
    title: "Gratitude Practice",
  },
  {
    image: require("../assets/images/anxiety.png"),
    description:
      "A short support practice for easing anxious thoughts and returning to breath.",
    duration: "6 MIN",
    id: "meditate-anxiety-release",
    meta: "SOS • 6 MIN",
    title: "Anxiety Release",
  },
  {
    image: require("../assets/images/confident.png"),
    description:
      "A steady affirmation session for grounding confidence in the body.",
    duration: "9 MIN",
    id: "meditate-inner-confidence",
    meta: "AFFIRMATION • 9 MIN",
    title: "Inner Confidence",
  },
];

const sleepRecommendations: RecItem[] = [
  {
    artColor: "#AFDBC5",
    description:
      "Slow ocean textures and moonlit ambience for drifting toward sleep.",
    duration: "18 MIN",
    id: "sleep-ocean-moon",
    meta: "SLEEP MUSIC • 18 MIN",
    title: "Ocean Moon",
  },
  {
    artColor: "#FFC97E",
    description:
      "A gentle bedtime story with soft pacing and low-stimulation imagery.",
    duration: "14 MIN",
    id: "sleep-quiet-night",
    meta: "SLEEP STORY • 14 MIN",
    title: "Quiet Night",
  },
  {
    artColor: "#8E97FD",
    description:
      "A dreamy sleepcast that moves through an island landscape at night.",
    duration: "20 MIN",
    id: "sleep-night-island-rec",
    meta: "SLEEPCAST • 20 MIN",
    title: "Night Island",
  },
  {
    artColor: "#C7D7FF",
    description:
      "A restful meditation that helps your body grow heavy and ready for bed.",
    duration: "12 MIN",
    id: "sleep-heavy-eyes",
    meta: "MEDITATION • 12 MIN",
    title: "Heavy Eyes",
  },
  {
    artColor: "#F4D6E4",
    description:
      "A cozy cabin story with quiet details, warm light, and a slow ending.",
    duration: "16 MIN",
    id: "sleep-starlit-cabin",
    meta: "STORY • 16 MIN",
    title: "Starlit Cabin",
  },
  {
    artColor: "#D8E8D3",
    description:
      "A long ambient rain track for masking distractions while you settle.",
    duration: "30 MIN",
    id: "sleep-rain-on-leaves",
    meta: "AMBIENT • 30 MIN",
    title: "Rain on Leaves",
  },
];

const musicRecommendations: RecItem[] = [
  {
    image: require("../assets/images/relaxation.png"),
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    description:
      "Soft piano phrases for a calmer background while resting or journaling.",
    duration: "15 MIN",
    id: "music-peaceful-piano-rec",
    meta: "PIANO • 15 MIN",
    title: "Peaceful Piano",
  },
  {
    image: require("../assets/images/energy.png"),
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    description:
      "Light tones and steady movement for a gentle lift without overwhelm.",
    duration: "12 MIN",
    id: "music-gentle-energy",
    meta: "SOUND • 12 MIN",
    title: "Gentle Energy",
  },
  {
    image: require("../assets/images/focus.png"),
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    description:
      "A focused instrumental stream for reading, planning, or deep work.",
    duration: "20 MIN",
    id: "music-deep-work-flow",
    meta: "FOCUS • 20 MIN",
    title: "Deep Work Flow",
  },
  {
    image: require("../assets/images/sleep.png"),
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    description:
      "Soft night waves and low textures for unwinding before sleep.",
    duration: "25 MIN",
    id: "music-soft-night-waves",
    meta: "SLEEP • 25 MIN",
    title: "Soft Night Waves",
  },
  {
    image: require("../assets/images/stress.png"),
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    description:
      "A short ambient track for loosening stress and resetting your pace.",
    duration: "10 MIN",
    id: "music-stress-melt",
    meta: "AMBIENT • 10 MIN",
    title: "Stress Melt",
  },
  {
    image: require("../assets/images/performance.png"),
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    description:
      "A steady rhythmic track for momentum during light work or movement.",
    duration: "18 MIN",
    id: "music-steady-rhythm",
    meta: "BEATS • 18 MIN",
    title: "Steady Rhythm",
  },
];

export const getRecommendations = async (
  section: "home" | "meditate" | "sleep" | "music",
  count = 6,
) => {
  // Simulate a small network delay; later this can be replaced with real API calls
  await new Promise((r) => setTimeout(r, 150));

  let source: RecItem[] = [];
  switch (section) {
    case "home":
      source = homeRecommendations;
      break;
    case "meditate":
      source = meditateRecommendations;
      break;
    case "sleep":
      source = sleepRecommendations;
      break;
    case "music":
      source = musicRecommendations;
      break;
    default:
      source = [];
  }

  const list = shuffle(source).slice(0, Math.min(count, source.length));
  return list;
};

export default { getRecommendations };
