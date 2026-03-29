import { useState, useEffect } from "react";

function RoundTimer({ isRunning, onTimeUp, resetKey }) {
  const TOTAL_TIME = 60;
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  // Reset timer when resetKey changes
  useEffect(() => {
    setTimeLeft(TOTAL_TIME);
  }, [resetKey]);

  // Countdown logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, resetKey]);

  // Color based on time left
  const getColor = () => {
    if (timeLeft > 30) return "#22C55E"; // Green
    if (timeLeft > 10) return "#F97316"; // Orange
    return "#EF4444";                     // Red - danger!
  };

  // Progress percentage
  const percentage = (timeLeft / TOTAL_TIME) * 100;

  return (
    <div style={styles.container}>
      {/* Timer Circle */}
      <div
        style={{
          ...styles.circle,
          border: `3px solid ${getColor()}`,
          color: getColor(),
        }}
      >
        <span style={styles.timeText}>{timeLeft}</span>
        <span style={styles.secText}>sec</span>
      </div>

      {/* Timer Bar */}
      <div style={styles.barContainer}>
        <div style={styles.barLabel}>
          <span style={styles.barText}>⏱️ Time Left</span>
          <span style={{ color: getColor(), fontWeight: "bold" }}>
            {timeLeft}s
          </span>
        </div>
        <div style={styles.barBackground}>
          <div
            style={{
              ...styles.barFill,
              width: `${percentage}%`,
              background: getColor(),
              transition: "width 1s linear, background 0.3s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    background: "#0F172A",
    border: "1px solid #1E293B",
    borderRadius: "12px",
    padding: "12px 16px",
    marginBottom: "16px",
  },
  circle: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "border-color 0.3s ease, color 0.3s ease",
  },
  timeText: {
    fontSize: "18px",
    fontWeight: "bold",
    lineHeight: 1,
  },
  secText: {
    fontSize: "10px",
    opacity: 0.7,
  },
  barContainer: {
    flex: 1,
  },
  barLabel: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px",
  },
  barText: {
    fontSize: "13px",
    color: "#64748B",
  },
  barBackground: {
    height: "8px",
    background: "#1E293B",
    borderRadius: "999px",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: "999px",
  },
};

export default RoundTimer;