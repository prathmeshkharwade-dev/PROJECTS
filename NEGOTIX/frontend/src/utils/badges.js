// All available badges in the game
export const BADGES = [
  {
    id: "first_deal",
    title: "First Deal 🤝",
    description: "Complete your first negotiation",
    condition: (stats) => stats.totalGames >= 1,
  },
  {
    id: "legendary_haggler",
    title: "Legendary Haggler 🏆",
    description: "Save 45% or more on any product",
    condition: (stats) => stats.bestSavingsPercent >= 45,
  },
  {
    id: "master_negotiator",
    title: "Master Negotiator 💎",
    description: "Save 35% or more on any product",
    condition: (stats) => stats.bestSavingsPercent >= 35,
  },
  {
    id: "sharp_trader",
    title: "Sharp Trader 🔥",
    description: "Win 3 negotiations in a row",
    condition: (stats) => stats.winStreak >= 3,
  },
  {
    id: "speed_dealer",
    title: "Speed Dealer ⚡",
    description: "Close a deal within 3 rounds",
    condition: (stats) => stats.fastestDeal <= 3,
  },
  {
    id: "hard_mode_winner",
    title: "Iron Nerve 💪",
    description: "Win on Hard difficulty",
    condition: (stats) => stats.hardModeWins >= 1,
  },
  {
    id: "collector",
    title: "Collector 🎖️",
    description: "Buy 5 different products",
    condition: (stats) => stats.uniqueProducts >= 5,
  },
  {
    id: "patient_buyer",
    title: "Patient Buyer 🧘",
    description: "Negotiate all 10 rounds",
    condition: (stats) => stats.maxRoundsPlayed >= 10,
  },
];

// Calculate which badges user has earned
export const getEarnedBadges = (stats) => {
  return BADGES.filter((badge) => badge.condition(stats));
};

// Build stats object from leaderboard entries
export const buildStats = (entries) => {
  if (!entries.length) return {};

  return {
    totalGames: entries.length,
    bestSavingsPercent: Math.max(...entries.map((e) => e.savingsPercent)),
    winStreak: calculateWinStreak(entries),
    fastestDeal: Math.min(...entries.map((e) => e.rounds)),
    hardModeWins: entries.filter((e) => e.difficulty === "hard").length,
    uniqueProducts: new Set(entries.map((e) => e.productName)).size,
    maxRoundsPlayed: Math.max(...entries.map((e) => e.rounds)),
  };
};

// Calculate current win streak
function calculateWinStreak(entries) {
  let streak = 0;
  for (let i = entries.length - 1; i >= 0; i--) {
    if (entries[i].savingsPercent >= 25) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}