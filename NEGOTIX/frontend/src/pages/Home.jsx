import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../constants/products.js";
import ProductCard from "../components/ProductCard.jsx";

function Home() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");

  // Difficulty options
  const difficulties = [
    {
      id: "easy",
      label: "Easy 😊",
      description: "Friendly seller — great for beginners!",
      color: "#22C55E",
    },
    {
      id: "medium",
      label: "Medium 🧔",
      description: "Shrewd bazaar merchant — needs good tactics!",
      color: "#F97316",
    },
    {
      id: "hard",
      label: "Hard 👔",
      description: "Strict businessman — only for experts!",
      color: "#EF4444",
    },
  ];

  // Handle start game
  const handleStart = () => {
    if (!playerName.trim()) {
      setError("Please enter your name!");
      return;
    }
    if (!selectedProduct) {
      setError("Please select a product!");
      return;
    }

    // Navigate to game with state
    navigate("/game", {
      state: {
        product: selectedProduct,
        difficulty: selectedDifficulty,
        playerName: playerName.trim(),
      },
    });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🛒 Negotix</h1>
        <p style={styles.subtitle}>
          Outsmart the AI seller. Get the best deal. Climb the leaderboard!
        </p>
        <button
          style={styles.leaderboardBtn}
          onClick={() => navigate("/leaderboard")}
        >
          🏆 Leaderboard
        </button>
      </div>

      {/* Player Name Input */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Your Name</h2>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter your name..."
          value={playerName}
          onChange={(e) => {
            setPlayerName(e.target.value);
            setError("");
          }}
          maxLength={20}
        />
      </div>

      {/* Difficulty Selection */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Select Difficulty</h2>
        <div style={styles.difficultyRow}>
          {difficulties.map((diff) => (
            <div
              key={diff.id}
              style={{
                ...styles.difficultyCard,
                border: `2px solid ${
                  selectedDifficulty === diff.id ? diff.color : "#334155"
                }`,
                background:
                  selectedDifficulty === diff.id ? "#1E293B" : "#0F172A",
              }}
              onClick={() => setSelectedDifficulty(diff.id)}
            >
              <p style={{ ...styles.diffLabel, color: diff.color }}>
                {diff.label}
              </p>
              <p style={styles.diffDesc}>{diff.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Selection */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Select a Product</h2>
        <div style={styles.productsGrid}>
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedProduct?.id === product.id}
              onSelect={() => {
                setSelectedProduct(product);
                setError("");
              }}
            />
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && <p style={styles.error}>{error}</p>}

      {/* Start Button */}
      <button
        style={{
          ...styles.startBtn,
          opacity: !playerName || !selectedProduct ? 0.5 : 1,
        }}
        onClick={handleStart}
      >
        🚀 Start Negotiation
      </button>
    </div>
  );
}

// Styles
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
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
    margin: "0 0 8px 0",
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "16px",
    color: "#94A3B8",
    margin: "0 0 16px 0",
  },
  leaderboardBtn: {
    background: "#1E293B",
    color: "#F1F5F9",
    border: "1px solid #334155",
    padding: "8px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  section: {
    marginBottom: "32px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#E2E8F0",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    background: "#1E293B",
    border: "1px solid #334155",
    borderRadius: "8px",
    color: "#F1F5F9",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  },
  difficultyRow: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  difficultyCard: {
    flex: 1,
    minWidth: "200px",
    padding: "16px",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  diffLabel: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 8px 0",
  },
  diffDesc: {
    fontSize: "13px",
    color: "#94A3B8",
    margin: 0,
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
  },
  error: {
    color: "#EF4444",
    textAlign: "center",
    marginBottom: "16px",
    fontSize: "14px",
  },
  startBtn: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "40px",
  },
};

export default Home;