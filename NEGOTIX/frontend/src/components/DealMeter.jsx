function DealMeter({ listPrice, currentPrice, minPrice }) {
  // Calculate savings percentage
  const totalRange = listPrice - minPrice;
  const saved = listPrice - currentPrice;
  const savingsPercent = Math.min(
    Math.max(Math.round((saved / totalRange) * 100), 0),
    100
  );

  // Deal levels
  const levels = [
    {
      label: "Rookie 😅",
      minPercent: 0,
      maxPercent: 24,
      color: "#94A3B8",
    },
    {
      label: "Decent 👍",
      minPercent: 25,
      maxPercent: 39,
      color: "#22C55E",
    },
    {
      label: "Sharp 🔥",
      minPercent: 40,
      maxPercent: 59,
      color: "#F97316",
    },
    {
      label: "Master 💎",
      minPercent: 60,
      maxPercent: 79,
      color: "#A78BFA",
    },
    {
      label: "Legend 🏆",
      minPercent: 80,
      maxPercent: 100,
      color: "#FFD700",
    },
  ];

  // Find current level
  const currentLevel = levels.find(
    (l) => savingsPercent >= l.minPercent && savingsPercent <= l.maxPercent
  ) || levels[0];

  return (
    <div style={styles.container}>
      {/* Title */}
      <div style={styles.titleRow}>
        <span style={styles.title}>🎯 Deal Meter</span>
        <span style={{ color: currentLevel.color, fontWeight: "bold" }}>
          {currentLevel.label}
        </span>
      </div>

      {/* Level Segments */}
      <div style={styles.segmentsRow}>
        {levels.map((level, index) => {
          const isActive = savingsPercent >= level.minPercent;
          return (
            <div
              key={index}
              style={{
                ...styles.segment,
                background: isActive ? level.color : "#1E293B",
                opacity: isActive ? 1 : 0.4,
                transition: "all 0.4s ease",
              }}
            />
          );
        })}
      </div>

      {/* Labels Row */}
      <div style={styles.labelsRow}>
        {levels.map((level, index) => (
          <span
            key={index}
            style={{
              ...styles.levelLabel,
              color:
                currentLevel.label === level.label
                  ? level.color
                  : "#475569",
              fontWeight:
                currentLevel.label === level.label ? "bold" : "normal",
            }}
          >
            {level.label}
          </span>
        ))}
      </div>

      {/* Stats Row */}
      <div style={styles.statsRow}>
        <div style={styles.stat}>
          <span style={styles.statLabel}>You Paid</span>
          <span style={styles.statValue}>${currentPrice}</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statLabel}>You Saved</span>
          <span style={{ ...styles.statValue, color: "#22C55E" }}>
            ${saved}
          </span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statLabel}>Savings</span>
          <span style={{ ...styles.statValue, color: currentLevel.color }}>
            {savingsPercent}%
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#0F172A",
    border: "1px solid #1E293B",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px",
  },
  titleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  title: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#E2E8F0",
  },
  segmentsRow: {
    display: "flex",
    gap: "4px",
    marginBottom: "6px",
  },
  segment: {
    flex: 1,
    height: "10px",
    borderRadius: "999px",
  },
  labelsRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  levelLabel: {
    fontSize: "10px",
    flex: 1,
    textAlign: "center",
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-around",
    borderTop: "1px solid #1E293B",
    paddingTop: "12px",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },
  statLabel: {
    fontSize: "11px",
    color: "#64748B",
  },
  statValue: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#F1F5F9",
  },
};

export default DealMeter;