function ProductCard({ product, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      style={{
        ...styles.card,
        border: `2px solid ${isSelected ? "#6366F1" : "#1E293B"}`,
        background: isSelected ? "#1E293B" : "#0F172A",
        transform: isSelected ? "scale(1.03)" : "scale(1)",
      }}
    >
      {/* Product Emoji */}
      <div style={styles.emoji}>{product.emoji}</div>

      {/* Product Info */}
      <div style={styles.info}>
        <p style={styles.name}>{product.name}</p>
        <p style={styles.category}>{product.category}</p>
        <p style={styles.description}>{product.description}</p>
      </div>

      {/* Price */}
      <div style={styles.priceRow}>
        <span style={styles.priceLabel}>List Price</span>
        <span style={styles.price}>${product.listPrice}</span>
      </div>

      {/* Selected Badge */}
      {isSelected && (
        <div style={styles.selectedBadge}>✅ Selected</div>
      )}
    </div>
  );
}

const styles = {
  card: {
    borderRadius: "12px",
    padding: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  emoji: {
    fontSize: "36px",
    textAlign: "center",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#F1F5F9",
    margin: "0 0 4px 0",
  },
  category: {
    fontSize: "11px",
    color: "#6366F1",
    fontWeight: "600",
    margin: "0 0 6px 0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  description: {
    fontSize: "12px",
    color: "#64748B",
    margin: 0,
    lineHeight: "1.4",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
    paddingTop: "8px",
    borderTop: "1px solid #1E293B",
  },
  priceLabel: {
    fontSize: "11px",
    color: "#64748B",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#22C55E",
  },
  selectedBadge: {
    textAlign: "center",
    fontSize: "12px",
    color: "#6366F1",
    fontWeight: "600",
    marginTop: "4px",
  },
};

export default ProductCard;