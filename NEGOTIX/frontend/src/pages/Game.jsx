import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendMessage } from "../utils/api.js";
import { saveToLeaderboard } from "../utils/leaderboard.js";
import { getEarnedBadges, buildStats } from "../utils/badges.js";
import { sellerPrompts } from "../constants/sellers.js";
import ChatBox from "../components/ChatBox.jsx";
import MessageInput from "../components/MessageInput.jsx";
import PriceBar from "../components/PriceBar.jsx";
import MoodIndicator from "../components/MoodIndicator.jsx";
import RoundTimer from "../components/RoundTimer.jsx";
import DealMeter from "../components/DealMeter.jsx";
import BadgeDisplay from "../components/BadgeDisplay.jsx";


const MAX_ROUNDS = 10;

function Game() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data from Home page
  const { product, difficulty, playerName } = location.state || {};

  // Redirect if no data
  useEffect(() => {
    if (!product || !difficulty || !playerName) {
      navigate("/");
    }
  }, []);

  // Seller info
  const seller = sellerPrompts[difficulty];

  // Game state
  const [messages, setMessages] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(product?.listPrice);
  const [currentMood, setCurrentMood] = useState("neutral 😐");
  const [round, setRound] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [timerKey, setTimerKey] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [timerRunning, setTimerRunning] = useState(true);

  // Handle sending message
  const handleSend = async (message) => {
    if (isLoading || gameOver) return;

    // Stop timer while AI responds
    setTimerRunning(false);

    // Add user message to chat
    const userMessage = { role: "user", content: message };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Call backend API
      const result = await sendMessage({
        message,
        history: messages,
        product,
        difficulty,
        round,
      });

      if (result.success) {
        const { message: aiReply, price, mood } = result.data;

        // Update price if new price received
        const newPrice = price || currentPrice;
        setCurrentPrice(newPrice);

        // Update mood
        if (mood) setCurrentMood(mood);

        // Add AI message to chat
        const aiMessage = {
          role: "assistant",
          content: aiReply,
          price: newPrice,
        };
        setMessages((prev) => [...prev, aiMessage]);

        // Check if max rounds reached
        if (round >= MAX_ROUNDS) {
          endGame(newPrice, updatedMessages.length);
        } else {
          // Next round
          setRound((prev) => prev + 1);
          setTimerKey((prev) => prev + 1);
          setTimerRunning(true);
        }
      } else {
        // Show error in chat
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `⚠️ ${result.error}`,
          },
        ]);
        setTimerRunning(true);
      }
    } catch (error) {
      console.error("Send message error:", error);
      setTimerRunning(true);
    }

    setIsLoading(false);
  };

  // Handle timer up
  const handleTimeUp = () => {
    if (gameOver || isLoading) return;
    if (round >= MAX_ROUNDS) {
      endGame(currentPrice, messages.length);
    } else {
      setRound((prev) => prev + 1);
      setTimerKey((prev) => prev + 1);
    }
  };

  // Handle deal accept
  const handleAcceptDeal = () => {
    endGame(currentPrice, messages.length);
  };

  // End game logic
  const endGame = (finalPrice, totalRounds) => {
    setGameOver(true);
    setTimerRunning(false);

    // Save to leaderboard
    const entry = saveToLeaderboard({
      playerName,
      productName: product.name,
      listPrice: product.listPrice,
      finalPrice,
      minPrice: product.minPrice,
      difficulty,
      rounds: totalRounds,
    });

    // Calculate badges
    const leaderboardData = JSON.parse(
      localStorage.getItem("negotix_leaderboard") || "[]"
    );
    const stats = buildStats(leaderboardData);
    const badges = getEarnedBadges(stats);
    setEarnedBadges(badges);

    // Set result
    setGameResult({
      finalPrice,
      savings: product.listPrice - finalPrice,
      savingsPercent: Math.round(
        ((product.listPrice - finalPrice) / product.listPrice) * 100
      ),
      rounds: totalRounds,
      entry,
    });
  };

  if (!product) return null;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate("/")}>
          ← Back
        </button>
        <div style={styles.headerCenter}>
          <span style={styles.productEmoji}>{product.emoji}</span>
          <span style={styles.productName}>{product.name}</span>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.playerName}>👤 {playerName}</span>
          <span style={styles.diffBadge}>{difficulty.toUpperCase()}</span>
        </div>
      </div>

      {/* Main Layout */}
      <div style={styles.layout}>
        {/* Left Column */}
        <div style={styles.leftCol}>
          {/* Mood Indicator */}
          <MoodIndicator
            mood={currentMood}
            sellerName={seller.name}
            sellerAvatar={seller.avatar}
          />

          {/* Round Timer */}
          <RoundTimer
            isRunning={timerRunning && !gameOver}
            onTimeUp={handleTimeUp}
            resetKey={timerKey}
          />

          {/* Price Bar */}
          <PriceBar
            listPrice={product.listPrice}
            currentPrice={currentPrice}
            minPrice={product.minPrice}
          />

          {/* Deal Meter */}
          <DealMeter
            listPrice={product.listPrice}
            currentPrice={currentPrice}
            minPrice={product.minPrice}
          />

          {/* Accept Deal Button */}
          {!gameOver && (
            <button
              style={styles.acceptBtn}
              onClick={handleAcceptDeal}
            >
              ✅ Accept Current Deal — ${currentPrice}
            </button>
          )}
        </div>

        {/* Right Column */}
        <div style={styles.rightCol}>
          {/* Chat Box */}
          <ChatBox
            messages={messages}
            isLoading={isLoading}
            sellerAvatar={seller.avatar}
          />

          {/* Message Input */}
          <MessageInput
            onSend={handleSend}
            isLoading={isLoading}
            isDisabled={gameOver}
            round={round}
            maxRounds={MAX_ROUNDS}
          />
        </div>
      </div>

      {/* Game Over Result */}
      {gameOver && gameResult && (
        <div style={styles.resultCard}>
          <h2 style={styles.resultTitle}>🎉 Negotiation Complete!</h2>

          {/* Stats */}
          <div style={styles.resultStats}>
            <div style={styles.resultStat}>
              <span style={styles.resultStatLabel}>Final Price</span>
              <span style={styles.resultStatValue}>
                ${gameResult.finalPrice}
              </span>
            </div>
            <div style={styles.resultStat}>
              <span style={styles.resultStatLabel}>You Saved</span>
              <span style={{ ...styles.resultStatValue, color: "#22C55E" }}>
                ${gameResult.savings}
              </span>
            </div>
            <div style={styles.resultStat}>
              <span style={styles.resultStatLabel}>Savings %</span>
              <span style={{ ...styles.resultStatValue, color: "#A78BFA" }}>
                {gameResult.savingsPercent}%
              </span>
            </div>
            <div style={styles.resultStat}>
              <span style={styles.resultStatLabel}>Rounds</span>
              <span style={styles.resultStatValue}>
                {gameResult.rounds}
              </span>
            </div>
          </div>

          {/* Badges */}
          <BadgeDisplay earnedBadges={earnedBadges} />

          {/* Action Buttons */}
          <div style={styles.resultBtns}>
            <button
              style={styles.leaderboardBtn}
              onClick={() => navigate("/leaderboard")}
            >
              🏆 View Leaderboard
            </button>
            <button
              style={styles.playAgainBtn}
              onClick={() => navigate("/")}
            >
              🔄 Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#020617",
    color: "#F1F5F9",
    padding: "16px",
    fontFamily: "sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    padding: "12px 16px",
    background: "#0F172A",
    borderRadius: "12px",
    border: "1px solid #1E293B",
  },
  backBtn: {
    background: "transparent",
    border: "1px solid #334155",
    color: "#94A3B8",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
  },
  headerCenter: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  productEmoji: {
    fontSize: "24px",
  },
  productName: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#F1F5F9",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  playerName: {
    fontSize: "13px",
    color: "#94A3B8",
  },
  diffBadge: {
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "999px",
    background: "#1E293B",
    color: "#A78BFA",
    border: "1px solid #4C1D95",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "350px 1fr",
    gap: "16px",
    alignItems: "start",
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
  },
  acceptBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #059669, #10B981)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "8px",
  },
  resultCard: {
    marginTop: "24px",
    background: "#0F172A",
    border: "1px solid #6366F1",
    borderRadius: "16px",
    padding: "24px",
  },
  resultTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 0 20px 0",
    color: "#F1F5F9",
  },
  resultStats: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "20px",
  },
  resultStat: {
    background: "#1E293B",
    borderRadius: "12px",
    padding: "16px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  resultStatLabel: {
    fontSize: "12px",
    color: "#64748B",
  },
  resultStatValue: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#F1F5F9",
  },
  resultBtns: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
  },
  leaderboardBtn: {
    flex: 1,
    padding: "14px",
    background: "#1E293B",
    color: "#F1F5F9",
    border: "1px solid #334155",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  playAgainBtn: {
    flex: 1,
    padding: "14px",
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Game;