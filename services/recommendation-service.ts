const shuffle = <T>(arr: T[]) => {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export type RecItem = {
  title: string;
  meta?: string;
  artColor?: string;
  image?: any;
};

const homeRecommendations: RecItem[] = [
  { artColor: "#AFDBC5", meta: "MEDITATION", title: "Focus" },
  { artColor: "#FAE8B8", meta: "COURSE", title: "Happiness" },
  { artColor: "#FFC97E", meta: "MUSIC", title: "Relaxation" },
  { artColor: "#8E97FD", meta: "GUIDED", title: "Breath" },
];

const meditateRecommendations: RecItem[] = [
  {
    image: require("../assets/images/focus.png"),
    meta: "MEDITATION",
    title: "Focus",
  },
  {
    image: require("../assets/images/calm.png"),
    meta: "PRACTICE",
    title: "Calm Mind",
  },
  {
    image: require("../assets/images/relaxation.png"),
    meta: "MUSIC",
    title: "Relaxation",
  },
];

const sleepRecommendations: RecItem[] = [
  { artColor: "#AFDBC5", meta: "SLEEP MUSIC", title: "Ocean Moon" },
  { artColor: "#FFC97E", meta: "SLEEP STORY", title: "Quiet Night" },
  { artColor: "#8E97FD", meta: "SLEEPCAST", title: "Night Island" },
];

const musicRecommendations: RecItem[] = [
  {
    image: require("../assets/images/relaxation.png"),
    meta: "MUSIC",
    title: "Relaxation",
  },
  {
    image: require("../assets/images/energy.png"),
    meta: "SOUND",
    title: "Gentle Energy",
  },
  {
    image: require("../assets/images/relaxation.png"),
    meta: "MUSIC",
    title: "Peaceful Piano",
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
