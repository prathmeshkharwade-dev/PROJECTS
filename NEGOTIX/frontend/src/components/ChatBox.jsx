import { useEffect, useRef } from "react";

function ChatBox({ messages, isLoading, sellerAvatar }) {
  const bottomRef = useRef(null);

  // Auto scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={styles.container}>
      {/* Empty State */}
      {messages.length === 0 && (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>
            🛒 Start negotiating! Make your first offer...
          </p>
        </div>
      )}

      {/* Messages */}
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            ...styles.messageRow,
            justifyContent:
              msg.role === "user" ? "flex-end" : "flex-start",
          }}
        >
          {/* Seller Avatar */}
          {msg.role === "assistant" && (
            <span style={styles.avatar}>{sellerAvatar}</span>
          )}

          {/* Message Bubble */}
          <div
            style={{
              ...styles.bubble,
              background:
                msg.role === "user" ? "#4F46E5" : "#1E293B",
              borderRadius:
                msg.role === "user"
                  ? "18px 18px 4px 18px"
                  : "18px 18px 18px 4px",
            }}
          >
            <p style={styles.messageText}>{msg.content}</p>

            {/* Price tag if available */}
            {msg.price && (
              <div style={styles.priceTag}>
                🏷️ Offer: ${msg.price}
              </div>
            )}
          </div>

          {/* User Avatar */}
          {msg.role === "user" && (
            <span style={styles.avatar}>👤</span>
          )}
        </div>
      ))}

      {/* Loading Animation */}
      {isLoading && (
        <div style={styles.messageRow}>
          <span style={styles.avatar}>{sellerAvatar}</span>
          <div style={styles.loadingBubble}>
            <span style={styles.dot} />
            <span style={styles.dot} />
            <span style={styles.dot} />
          </div>
        </div>
      )}

      {/* Auto scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    background: "#020617",
    borderRadius: "12px",
    minHeight: "300px",
    maxHeight: "400px",
    border: "1px solid #1E293B",
    marginBottom: "16px",
  },
  emptyState: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#475569",
    fontSize: "14px",
    textAlign: "center",
  },
  messageRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: "8px",
  },
  avatar: {
    fontSize: "24px",
    flexShrink: 0,
  },
  bubble: {
    maxWidth: "70%",
    padding: "10px 14px",
  },
  messageText: {
    fontSize: "14px",
    color: "#F1F5F9",
    margin: 0,
    lineHeight: "1.5",
  },
  priceTag: {
    marginTop: "6px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#22C55E",
    background: "#052E16",
    borderRadius: "6px",
    padding: "4px 8px",
    display: "inline-block",
  },
  loadingBubble: {
    background: "#1E293B",
    borderRadius: "18px 18px 18px 4px",
    padding: "12px 16px",
    display: "flex",
    gap: "4px",
    alignItems: "center",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#6366F1",
    animation: "bounce 1s infinite",
    display: "inline-block",
  },
};

export default ChatBox;