import { BADGES } from "../utils/badges.js";

function BadgeDisplay({ earnedBadges }) {
  return (
    <div style={styles.container}>
      {/* Title */}
      <h3 style={styles.title}>🎖️ Achievements</h3>

      {/* Badges Grid */}
      <div style={styles.grid}>
        {BADGES.map((badge) => {
          const isEarned = earnedBadges.some((b) => b.id === badge.id);

          return (
            <div
              key={badge.id}
              style={{
                ...styles.badgeCard,
                background: isEarned ? "#1E293B" : "#0F172A",
                border: `1px solid ${isEarned ? "#6366F1" : "#1E293B"}`,
                opacity: isEarned ? 1 : 0.5,
              }}
            >
              {/* Badge Title */}
              <p style={styles.badgeTitle}>{badge.title}</p>

              {/* Badge Description */}
              <p style={styles.badgeDesc}>{badge.description}</p>

              {/* Status */}
              <p
                style={{
                  ...styles.badgeStatus,
                  color: isEarned ? "#22C55E" : "#475569",
                }}
              >
                {isEarned ? "✅ Earned!" : "🔒 Locked"}
              </p>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div style={styles.summary}>
        <span style={styles.summaryText}>
          {earnedBadges.length} / {BADGES.length} badges earned
        </span>
        <div style={styles.summaryBar}>
          <div
            style={{
              ...styles.summaryFill,
              width: `${(earnedBadges.length / BADGES.length) * 100}%`,
            }}
          />
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
  title: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#E2E8F0",
    margin: "0 0 16px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: "10px",
    marginBottom: "16px",
  },
  badgeCard: {
    borderRadius: "10px",
    padding: "12px",
    transition: "all 0.3s ease",
  },
  badgeTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#F1F5F9",
    margin: "0 0 4px 0",
  },
  badgeDesc: {
    fontSize: "11px",
    color: "#64748B",
    margin: "0 0 8px 0",
    lineHeight: "1.4",
  },
  badgeStatus: {
    fontSize: "11px",
    fontWeight: "600",
    margin: 0,
  },
  summary: {
    borderTop: "1px solid #1E293B",
    paddingTop: "12px",
  },
  summaryText: {
    fontSize: "12px",
    color: "#64748B",
    display: "block",
    marginBottom: "6px",
  },
  summaryBar: {
    height: "6px",
    background: "#1E293B",
    borderRadius: "999px",
    overflow: "hidden",
  },
  summaryFill: {
    height: "100%",
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    borderRadius: "999px",
    transition: "width 0.5s ease",
  },
};

export default BadgeDisplay;