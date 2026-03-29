import { useState } from "react";
import { getRandomTactics } from "../constants/tactics.js";

function MessageInput({ onSend, isLoading, isDisabled, round, maxRounds }) {
  const [message, setMessage] = useState("");
  const [showTactics, setShowTactics] = useState(false);
  const [randomTactics] = useState(() => getRandomTactics());

  // Handle send
  const handleSend = () => {
    if (!message.trim() || isLoading || isDisabled) return;
    onSend(message.trim());
    setMessage("");
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Use tactic as message
  const handleTacticClick = (example) => {
    setMessage(example);
    setShowTactics(false);
  };

  return (
    <div style={styles.container}>
      {/* Round Info */}
      <div style={styles.roundInfo}>
        <span style={styles.roundText}>
          Round {round} of {maxRounds}
        </span>
        <button
          style={styles.tacticsBtn}
          onClick={() => setShowTactics(!showTactics)}
        >
          💡 Tactics Hint
        </button>
      </div>

      {/* Tactics Panel */}
      {showTactics && (
        <div style={styles.tacticsPanel}>
          <p style={styles.tacticsTitle}>
            🎯 Quick Tactics — Click to use:
          </p>
          {randomTactics.map((tactic) => (
            <div
              key={tactic.id}
              style={styles.tacticCard}
              onClick={() => handleTacticClick(tactic.example)}
            >
              <p style={styles.tacticTitle}>{tactic.title}</p>
              <p style={styles.tacticExample}>"{tactic.example}"</p>
            </div>
          ))}
        </div>
      )}

      {/* Input Row */}
      <div style={styles.inputRow}>
        <textarea
          style={styles.textarea}
          placeholder={
            isDisabled
              ? "Game over! Check your results below."
              : "Type your offer or argument... (Enter to send)"
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading || isDisabled}
          rows={2}
        />
        <button
          style={{
            ...styles.sendBtn,
            opacity: !message.trim() || isLoading || isDisabled ? 0.5 : 1,
            cursor:
              !message.trim() || isLoading || isDisabled
                ? "not-allowed"
                : "pointer",
          }}
          onClick={handleSend}
          disabled={!message.trim() || isLoading || isDisabled}
        >
          {isLoading ? "⏳" : "🚀"}
        </button>
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
  },
  roundInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  roundText: {
    fontSize: "13px",
    color: "#64748B",
    fontWeight: "600",
  },
  tacticsBtn: {
    background: "#1E293B",
    color: "#A78BFA",
    border: "1px solid #4C1D95",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },
  tacticsPanel: {
    background: "#1E293B",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "12px",
  },
  tacticsTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#E2E8F0",
    margin: "0 0 10px 0",
  },
  tacticCard: {
    background: "#0F172A",
    borderRadius: "8px",
    padding: "10px 12px",
    marginBottom: "8px",
    cursor: "pointer",
    border: "1px solid #334155",
    transition: "all 0.2s",
  },
  tacticTitle: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#A78BFA",
    margin: "0 0 4px 0",
  },
  tacticExample: {
    fontSize: "12px",
    color: "#94A3B8",
    margin: 0,
    fontStyle: "italic",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-end",
  },
  textarea: {
    flex: 1,
    background: "#1E293B",
    border: "1px solid #334155",
    borderRadius: "10px",
    padding: "10px 14px",
    color: "#F1F5F9",
    fontSize: "14px",
    resize: "none",
    outline: "none",
    fontFamily: "sans-serif",
    lineHeight: "1.5",
  },
  sendBtn: {
    width: "48px",
    height: "48px",
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    border: "none",
    borderRadius: "10px",
    fontSize: "20px",
    cursor: "pointer",
    flexShrink: 0,
  },
};

export default MessageInput;