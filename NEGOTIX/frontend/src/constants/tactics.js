export const TACTICS = [
  // ── BASIC TACTICS ──────────────────────────────
  {
    id: 1,
    title: "Cash Payment Offer 💵",
    description: "Tell the seller you will pay immediately in cash",
    example: "I can pay you right now in cash — no waiting, no hassle!",
    effectiveness: "high",
    category: "Payment",
  },
  {
    id: 2,
    title: "Market Comparison 📊",
    description: "Compare price with other sellers in the market",
    example: "I found the same item for $X elsewhere. Can you match it?",
    effectiveness: "high",
    category: "Research",
  },
  {
    id: 3,
    title: "Bulk Purchase Hint 📦",
    description: "Hint that you might buy more items",
    example: "If the price is right, I might take 2-3 of these!",
    effectiveness: "high",
    category: "Volume",
  },

  // ── MEDIUM TACTICS ─────────────────────────────
  {
    id: 4,
    title: "Referral Promise 🤝",
    description: "Promise to refer friends and family",
    example: "I know many people who would love this. Good deal = good referrals!",
    effectiveness: "medium",
    category: "Network",
  },
  {
    id: 5,
    title: "Point Out Flaws 🔍",
    description: "Politely mention small defects or issues",
    example: "I notice a small scratch here — can you adjust the price?",
    effectiveness: "medium",
    category: "Quality",
  },
  {
    id: 6,
    title: "Walk Away Threat 🚶",
    description: "Pretend you are about to leave",
    example: "I appreciate your time, but this is over my budget. I'll look elsewhere.",
    effectiveness: "medium",
    category: "Pressure",
  },
  {
    id: 7,
    title: "Emotional Appeal 🥺",
    description: "Share a personal story about why you need it",
    example: "This is a gift for my father — he has always wanted one of these.",
    effectiveness: "medium",
    category: "Emotion",
  },

  // ── ADVANCED TACTICS ───────────────────────────
  {
    id: 8,
    title: "Anchor Low 🎯",
    description: "Start with a very low offer to anchor the negotiation",
    example: "I was thinking around $X — what do you think?",
    effectiveness: "high",
    category: "Psychology",
  },
  {
    id: 9,
    title: "Silent Pause ⏸️",
    description: "After making an offer just wait — let seller respond first",
    example: "My best offer is $X. [Wait silently for response]",
    effectiveness: "high",
    category: "Psychology",
  },
  {
    id: 10,
    title: "Bundle Deal 🎁",
    description: "Ask seller to add something extra instead of reducing price",
    example: "Keep the price but can you throw in the carrying case?",
    effectiveness: "medium",
    category: "Value",
  },
  {
    id: 11,
    title: "Deadline Pressure ⏰",
    description: "Tell seller you need to decide today only",
    example: "I need to decide by today — is this your final price?",
    effectiveness: "medium",
    category: "Urgency",
  },
  {
    id: 12,
    title: "Good Cop Bad Cop 👥",
    description: "Mention a strict partner who controls the budget",
    example: "I love it but my wife will kill me if I spend more than $X!",
    effectiveness: "high",
    category: "Psychology",
  },
];

// Filter tactics by effectiveness
export const getTopTactics = () =>
  TACTICS.filter((t) => t.effectiveness === "high");

// Get random 3 tactics for hint system
export const getRandomTactics = () => {
  const shuffled = [...TACTICS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};