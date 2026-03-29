function PriceBar({ listPrice, currentPrice, minPrice }) {
  // Calculate progress percentage
  const totalRange = listPrice - minPrice;
  const priceDropped = listPrice - currentPrice;
  const percentage = Math.min(
    Math.max((priceDropped / totalRange) * 100, 0),
    100
  );

  // Color changes based on progress
  const getBarColor = () => {
    if (percentage >= 70) return "#22C55E"; // Green - amazing deal!
    if (percentage >= 40) return "#F97316"; // Orange - good deal
    return "#6366F1";                        // Purple - keep going
  };

  // Savings amount
  const savings = listPrice - currentPrice;

  return (
    <div style={styles.container}>
      {/* Title Row */}
      <div style={styles.titleRow}>
        <span style={styles.label}>💰 Price Progress</span>
        <span style={styles.savings}>
          Saved: ${savings}
        </span>
      </div>

      {/* Price Labels */}
      <div style={styles.priceLabels}>
        <span style={styles.listPriceLabel}>
          List: ${listPrice}
        </span>
        <span style={styles.currentPriceLabel}>
          Current: ${currentPrice}
        </span>
        <span style={styles.minPriceLabel}>
          Min: ~${minPrice}?
        </span>
      </div>

      {/* Progress Bar */}
      <div style={styles.barBackground}>
        <div
          style={{
            ...styles.barFill,
            width: `${percentage}%`,
            background: getBarColor(),
            transition: "width 0.5s ease, background 0.3s ease",
          }}
        />
      </div>

      {/* Percentage Label */}
      <div style={styles.percentRow}>
        <span style={{ color: getBarColor(), fontWeight: "bold" }}>
          {Math.round(percentage)}% progress toward best deal!
        </span>
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
    marginBottom: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#E2E8F0",
  },
  savings: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#22C55E",
  },
  priceLabels: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  listPriceLabel: {
    fontSize: "12px",
    color: "#EF4444",
  },
  currentPriceLabel: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#F1F5F9",
  },
  minPriceLabel: {
    fontSize: "12px",
    color: "#22C55E",
  },
  barBackground: {
    height: "12px",
    background: "#1E293B",
    borderRadius: "999px",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: "999px",
  },
  percentRow: {
    marginTop: "8px",
    textAlign: "center",
    fontSize: "12px",
  },
};

export default PriceBar;