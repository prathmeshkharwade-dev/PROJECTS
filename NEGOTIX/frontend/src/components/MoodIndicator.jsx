function MoodIndicator({ mood, sellerName, sellerAvatar }) {
  // Mood config
  const moodConfig = {
    "happy 😊": {
      emoji: "😊",
      label: "Happy",
      tip: "Great time to push harder — seller is in a good mood!",
      color: "#22C55E",
      bg: "#052E16",
    },
    "neutral 😐": {
      emoji: "😐",
      label: "Neutral",
      tip: "Use a strong argument to shift the mood in your favor!",
      color: "#F59E0B",
      bg: "#1C1408",
    },
    "annoyed 😤": {
      emoji: "😤",
      label: "Annoyed",
      tip: "Be careful! Try flattery or a reasonable offer now.",
      color: "#F97316",
      bg: "#1C0A04",
    },
    "angry 😠": {
      emoji: "😠",
      label: "Angry",
      tip: "Back off! Apologize and make a fair offer quickly.",
      color: "#EF4444",
      bg: "#1C0202",
    },
  };

  // Get current mood data
  const currentMood = moodConfig[mood?.toLowerCase()] || moodConfig["neutral 😐"];

  return (
    <div
      style={{
        ...styles.container,
        background: currentMood.bg,
        border: `1px solid ${currentMood.color}`,
      }}
    >
      {/* Seller Info */}
      <div style={styles.sellerRow}>
        <span style={styles.avatar}>{sellerAvatar}</span>
        <div>
          <p style={styles.sellerName}>{sellerName}</p>
          <p style={{ ...styles.moodLabel, color: currentMood.color }}>
            {currentMood.emoji} {currentMood.label}
          </p>
        </div>
      </div>

      {/* Tip */}
      <div style={styles.tipRow}>
        <span style={styles.tipIcon}>💡</span>
        <p style={styles.tipText}>{currentMood.tip}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    borderRadius: "12px",
    padding: "14px 16px",
    marginBottom: "16px",
    transition: "all 0.3s ease",
  },
  sellerRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "10px",
  },
  avatar: {
    fontSize: "36px",
  },
  sellerName: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#F1F5F9",
    margin: "0 0 2px 0",
  },
  moodLabel: {
    fontSize: "13px",
    fontWeight: "600",
    margin: 0,
  },
  tipRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    background: "#00000030",
    borderRadius: "8px",
    padding: "8px 12px",
  },
  tipIcon: {
    fontSize: "14px",
    marginTop: "1px",
  },
  tipText: {
    fontSize: "12px",
    color: "#CBD5E1",
    margin: 0,
    lineHeight: "1.5",
  },
};

export default MoodIndicator;