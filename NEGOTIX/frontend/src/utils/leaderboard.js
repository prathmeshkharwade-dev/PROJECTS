const LEADERBOARD_KEY = "negotix_leaderboard";
const MAX_ENTRIES = 10;

// Save new entry to leaderboard
export const saveToLeaderboard = (entry) => {
  const existing = getLeaderboard();

  const newEntry = {
    id: Date.now(),
    playerName: entry.playerName,
    productName: entry.productName,
    listPrice: entry.listPrice,
    finalPrice: entry.finalPrice,
    minPrice: entry.minPrice,
    savings: entry.listPrice - entry.finalPrice,
    savingsPercent: Math.round(
      ((entry.listPrice - entry.finalPrice) / entry.listPrice) * 100
    ),
    difficulty: entry.difficulty,
    rounds: entry.rounds,
    date: new Date().toLocaleDateString(),
  };

  // Add new entry and sort by savings (highest first)
  const updated = [...existing, newEntry]
    .sort((a, b) => b.savings - a.savings)
    .slice(0, MAX_ENTRIES); // Keep only top 10

  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
  return newEntry;
};

// Get all leaderboard entries
export const getLeaderboard = () => {
  const data = localStorage.getItem(LEADERBOARD_KEY);
  return data ? JSON.parse(data) : [];
};

// Get player rank after saving
export const getPlayerRank = (entryId) => {
  const leaderboard = getLeaderboard();
  return leaderboard.findIndex((e) => e.id === entryId) + 1;
};

// Clear leaderboard
export const clearLeaderboard = () => {
  localStorage.removeItem(LEADERBOARD_KEY);
};

// Calculate performance label
export const getPerformanceLabel = (savingsPercent) => {
  if (savingsPercent >= 45) return { label: "Legendary Haggler 🏆", color: "#FFD700" };
  if (savingsPercent >= 35) return { label: "Master Negotiator 💎", color: "#A78BFA" };
  if (savingsPercent >= 25) return { label: "Sharp Trader 🔥", color: "#F97316" };
  if (savingsPercent >= 15) return { label: "Decent Buyer 👍", color: "#22C55E" };
  return { label: "Rookie Buyer 😅", color: "#94A3B8" };
};