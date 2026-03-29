import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLeaderboard, clearLeaderboard, getPerformanceLabel } from "../utils/leaderboard.js";

function Leaderboard() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  // Load leaderboard on mount
  useEffect(() => {
    const data = getLeaderboard();
    setEntries(data);
  }, []);

  // Clear leaderboard
  const handleClear = () => {
    clearLeaderboard();
    setEntries([]);
    setShowConfirm(false);
  };

  // Rank medals
  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  // Difficulty color
  const getDiffColor = (diff) => {
    if (diff === "easy") return "#22C55E";
    if (diff === "medium") return "#F97316";
    return "#EF4444";
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backBtn}
          onClick={() => navigate("/")}
        >
          ← Back
        </button>
        <h1 style={styles.title}>🏆 Leaderboard</h1>
        <button
          style={styles.clearBtn}
          onClick={() => setShowConfirm(true)}
        >
          🗑️ Clear
        </button>
      </div>

      {/* Confirm Clear */}
      {showConfirm && (
        <div style={styles.confirmBox}>
          <p style={styles.confirmText}>
            ⚠️ Are you sure? All scores will be deleted!
          </p>
          <div style={styles.confirmBtns}>
            <button style={styles.confirmYes} onClick={handleClear}>
              Yes, Clear!
            </button>
            <button
              style={styles.confirmNo}
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {entries.length === 0 && (
        <div style={styles.emptyState}>
          <p style={styles.emptyEmoji}>🛒</p>
          <p style={styles.emptyTitle}>No scores yet!</p>
          <p style={styles.emptyDesc}>
            Complete a negotiation to appear on the leaderboard.
          </p>
          <button
            style={styles.playBtn}
            onClick={() => navigate("/")}
          >
            🚀 Start Playing!
          </button>
        </div>
      )}

      {/* Leaderboard Table */}
      {entries.length > 0 && (
        <div style={styles.tableContainer}>
          {/* Table Header */}
          <div style={styles.tableHeader}>
            <span style={{ ...styles.headerCell, width: "60px" }}>Rank</span>
            <span style={{ ...styles.headerCell, flex: 1 }}>Player</span>
            <span style={{ ...styles.headerCell, flex: 1 }}>Product</span>
            <span style={{ ...styles.headerCell, width: "100px" }}>Saved</span>
            <span style={{ ...styles.headerCell, width: "80px" }}>%</span>
            <span style={{ ...styles.headerCell, width: "80px" }}>Diff</span>
            <span style={{ ...styles.headerCell, width: "80px" }}>Rounds</span>
            <span style={{ ...styles.headerCell, width: "100px" }}>Badge</span>
          </div>

          {/* Table Rows */}
          {entries.map((entry, index) => {
            const perf = getPerformanceLabel(entry.savingsPercent);
            return (
              <div
                key={entry.id}
                style={{
                  ...styles.tableRow,
                  background: index === 0
                    ? "#1C1400"
                    : index === 1
                    ? "#0F1A0F"
                    : index === 2
                    ? "#0F1118"
                    : "#0F172A",
                  border: `1px solid ${
                    index === 0
                      ? "#F59E0B"
                      : index === 1
                      ? "#94A3B8"
                      : index === 2
                      ? "#B45309"
                      : "#1E293B"
                  }`,
                }}
              >
                {/* Rank */}
                <span style={{ ...styles.cell, width: "60px", fontSize: "20px" }}>
                  {getMedal(index)}
                </span>

                {/* Player */}
                <span style={{ ...styles.cell, flex: 1, fontWeight: "700" }}>
                  {entry.playerName}
                </span>

                {/* Product */}
                <span style={{ ...styles.cell, flex: 1, color: "#94A3B8" }}>
                  {entry.productName}
                </span>

                {/* Saved */}
                <span style={{ ...styles.cell, width: "100px", color: "#22C55E", fontWeight: "700" }}>
                  ${entry.savings}
                </span>

                {/* Percent */}
                <span style={{ ...styles.cell, width: "80px", color: perf.color, fontWeight: "700" }}>
                  {entry.savingsPercent}%
                </span>

                {/* Difficulty */}
                <span
                  style={{
                    ...styles.cell,
                    width: "80px",
                    color: getDiffColor(entry.difficulty),
                    fontWeight: "600",
                    fontSize: "11px",
                  }}
                >
                  {entry.difficulty.toUpperCase()}
                </span>

                {/* Rounds */}
                <span style={{ ...styles.cell, width: "80px", color: "#64748B" }}>
                  {entry.rounds}
                </span>

                {/* Badge */}
                <span style={{ ...styles.cell, width: "100px", fontSize: "11px", color: perf.color }}>
                  {perf.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Play Again Button */}
      {entries.length > 0 && (
        <button
          style={styles.playAgainBtn}
          onClick={() => navigate("/")}
        >
          🚀 Play Again
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#020617",
    color: "#F1F5F9",
    padding: "24px",
    fontFamily: "sans-serif",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  backBtn: {
    background: "#1E293B",
    color: "#F1F5F9",
    border: "1px solid #334155",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    margin: 0,
    background: "linear-gradient(135deg, #F59E0B, #FBBF24)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  clearBtn: {
    background: "#1E293B",
    color: "#EF4444",
    border: "1px solid #EF4444",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  confirmBox: {
    background: "#1E293B",
    border: "1px solid #EF4444",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "20px",
    textAlign: "center",
  },
  confirmText: {
    color: "#FCA5A5",
    marginBottom: "12px",
    fontSize: "14px",
  },
  confirmBtns: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },
  confirmYes: {
    background: "#EF4444",
    color: "white",
    border: "none",
    padding: "8px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  confirmNo: {
    background: "#334155",
    color: "#F1F5F9",
    border: "none",
    padding: "8px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  emptyState: {
    textAlign: "center",
    padding: "80px 20px",
  },
  emptyEmoji: {
    fontSize: "64px",
    margin: "0 0 16px 0",
  },
  emptyTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#F1F5F9",
    margin: "0 0 8px 0",
  },
  emptyDesc: {
    fontSize: "14px",
    color: "#64748B",
    margin: "0 0 24px 0",
  },
  playBtn: {
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    color: "white",
    border: "none",
    padding: "14px 32px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  tableHeader: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    background: "#1E293B",
    borderRadius: "10px",
    gap: "8px",
  },
  headerCell: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tableRow: {
    display: "flex",
    alignItems: "center",
    padding: "14px 16px",
    borderRadius: "10px",
    gap: "8px",
    transition: "all 0.2s",
  },
  cell: {
    fontSize: "14px",
    color: "#F1F5F9",
  },
  playAgainBtn: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "24px",
  },
};

export default Leaderboard;