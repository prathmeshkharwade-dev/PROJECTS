import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendMessage } from "../utils/api.js";
import { saveToLeaderboard, getPerformanceLabel } from "../utils/leaderboard.js";
import { getEarnedBadges, buildStats } from "../utils/badges.js";
import { sellerPrompts } from "../constants/sellers.js";

const MAX_ROUNDS = 10;

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  const { product, difficulty, playerName } = location.state || {};

  useEffect(() => {
    if (!product || !difficulty || !playerName) navigate("/");
  }, []);

  // ── FIX: Dynamic API URL for Deployment ──
  const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://negotix-backend.onrender.com"; 

  const seller = sellerPrompts?.[difficulty] || { name: "Seller", avatar: "🧔" };

  // ── STATE ─────────────────────────────────────
  const [messages,      setMessages]      = useState([]);
  const [currentPrice,  setCurrentPrice]  = useState(product?.listPrice);
  const [currentMood,   setCurrentMood]   = useState("neutral 😐");
  const [round,         setRound]         = useState(1);
  const [isLoading,     setIsLoading]     = useState(false);
  const [gameOver,      setGameOver]      = useState(false);
  const [gameResult,    setGameResult]    = useState(null);
  const [earnedBadges,  setEarnedBadges]  = useState([]);
  const [message,        setMessage]       = useState("");
  const [showTactics,   setShowTactics]   = useState(false);
  const [timeLeft,      setTimeLeft]      = useState(60);
  const [timerActive,   setTimerActive]   = useState(true);

  // ── AUTO SCROLL ───────────────────────────────
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // ── TIMER ─────────────────────────────────────
  useEffect(() => {
    if (!timerActive || gameOver) return;
    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, timerActive, gameOver]);

  const resetTimer = () => { setTimeLeft(60); setTimerActive(true); };

  const handleTimeUp = () => {
    if (gameOver) return;
    if (round >= MAX_ROUNDS) { endGame(currentPrice, messages.length); return; }
    setRound((p) => p + 1);
    resetTimer();
  };

  // ── SEND MESSAGE ──────────────────────────────
  const handleSend = async () => {
    if (!message.trim() || isLoading || gameOver) return;
    setTimerActive(false);

    const userMsg = { role: "user", content: message };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setMessage("");
    setIsLoading(true);
    setShowTactics(false);

    try {
      const result = await sendMessage({
        message: message.trim(),
        history: messages,
        product, difficulty, round,
      });

      if (result.success) {
        const { message: aiReply, price, mood } = result.data;
        const newPrice = price || currentPrice;
        setCurrentPrice(newPrice);
        if (mood) setCurrentMood(mood);
        setMessages((p) => [...p, { role: "assistant", content: aiReply, price: newPrice }]);

        if (round >= MAX_ROUNDS) {
          endGame(newPrice, updated.length + 1);
        } else {
          setRound((p) => p + 1);
          resetTimer();
        }
      } else {
        setMessages((p) => [...p, { role: "assistant", content: `⚠️ ${result.error}` }]);
        setTimerActive(true);
      }
    } catch (e) {
      console.error(e);
      setTimerActive(true);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  // ── END GAME ──────────────────────────────────
  const endGame = async (finalPrice, totalRounds) => {
    setGameOver(true);
    setTimerActive(false);

    const savingsPercent = Math.round(((product.listPrice - finalPrice) / product.listPrice) * 100);

    const token = localStorage.getItem("token");
    if (token) {
      try {
        // ── FIX: Uses Dynamic API URL ──
        await fetch(`${API_BASE_URL}/api/leaderboard`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify({ 
            score: savingsPercent,
            productName: product.name,      
            savedAmount: product.listPrice - finalPrice,
            rounds: totalRounds,             
            difficulty: difficulty           
          }),
        });
        console.log("Score saved to MongoDB!");
      } catch (error) {
        console.error("Failed to save score to DB", error);
      }
    }

    const entry = saveToLeaderboard({
      playerName, productName: product.name,
      listPrice: product.listPrice, finalPrice,
      minPrice: product.minPrice, difficulty, rounds: totalRounds,
    });

    const lb    = JSON.parse(localStorage.getItem("negotix_leaderboard") || "[]");
    const stats = buildStats(lb);
    setEarnedBadges(getEarnedBadges(stats));

    setGameResult({
      finalPrice,
      savings:         product.listPrice - finalPrice,
      savingsPercent: savingsPercent,
      rounds:          totalRounds,
      entry,
    });
  };

  // ── HELPERS ───────────────────────────────────
  const timerColor =
    timeLeft > 30 ? "text-emerald-400 border-emerald-400" :
    timeLeft > 10 ? "text-amber-400  border-amber-400"    :
                    "text-red-400    border-red-400";

  const timerBg =
    timeLeft > 30 ? "bg-emerald-400" :
    timeLeft > 10 ? "bg-amber-400"   :
                    "bg-red-400";

  const totalRange   = product?.listPrice - product?.minPrice;
  const dropped      = product?.listPrice - currentPrice;
  const progress     = Math.min(Math.max((dropped / totalRange) * 100, 0), 100);
  const savings      = product?.listPrice - currentPrice;

  const progressColor =
    progress >= 70 ? "bg-emerald-400" :
    progress >= 40 ? "bg-amber-400"   :
                     "bg-cyan-400";

  const moodConfig = {
    "happy 😊":   { color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/30", tip: "Great time to push harder — seller is happy!" },
    "neutral 😐": { color: "text-amber-400",   bg: "bg-amber-400/10   border-amber-400/30",   tip: "Use a strong argument to shift the mood!"    },
    "annoyed 😤": { color: "text-orange-400",  bg: "bg-orange-400/10  border-orange-400/30",  tip: "Be careful! Try flattery or a fair offer."   },
    "angry 😠":   { color: "text-red-400",     bg: "bg-red-400/10     border-red-400/30",     tip: "Back off! Apologize and offer something fair."},
  };
  const mood = moodConfig[currentMood?.toLowerCase()] || moodConfig["neutral 😐"];

  const dealLevels = [
    { label: "Rookie 😅",  pct: 0,  color: "bg-slate-500"  },
    { label: "Decent 👍",  pct: 25, color: "bg-emerald-400" },
    { label: "Sharp 🔥",   pct: 40, color: "bg-amber-400"   },
    { label: "Master 💎",  pct: 60, color: "bg-purple-400"  },
    { label: "Legend 🏆",  pct: 80, color: "bg-yellow-400"  },
  ];
  const currentLevel = [...dealLevels].reverse().find((l) => progress >= l.pct) || dealLevels[0];

  const tactics = [
    { title: "Cash Payment 💵",     example: "I can pay you right now in cash — no waiting!" },
    { title: "Market Comparison 📊", example: "I found the same item cheaper elsewhere. Can you match it?" },
    { title: "Walk Away 🚶",         example: "This is over my budget. I might have to look elsewhere sadly." },
    { title: "Bulk Hint 📦",         example: "If the price is right, I might take 2-3 of these!" },
    { title: "Emotional Appeal 🥺",  example: "This is a gift for my father who always wanted one of these." },
    { title: "Anchor Low 🎯",         example: "I was thinking around a much lower price — what do you think?" },
  ];

  if (!product) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ── NAVBAR ──────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-cyan-400 font-bold text-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Negotix
        </button>

        <div className="flex items-center gap-3">
          <span className="text-2xl">{product.emoji}</span>
          <div>
            <p className="text-sm font-bold text-white leading-tight">{product.name}</p>
            <p className="text-xs text-slate-500">List: ${product.listPrice}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400">👤 {playerName}</span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border
            ${difficulty === "easy"   ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/30" :
              difficulty === "medium" ? "text-amber-400   bg-amber-400/10   border-amber-400/30"   :
                                        "text-red-400     bg-red-400/10     border-red-400/30"     }`}>
            {difficulty.toUpperCase()}
          </span>
          <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
            Round {round}/{MAX_ROUNDS}
          </span>
        </div>
      </nav>

      {/* ── MAIN LAYOUT ─────────────────────── */}
      <div className="pt-16 max-w-7xl mx-auto px-6 py-6 grid grid-cols-[340px_1fr] gap-5 items-start">

        {/* ── LEFT PANEL ──────────────────── */}
        <div className="flex flex-col gap-4">

          <div className={`flex items-center gap-4 p-4 rounded-2xl border ${mood.bg}`}>
            <span className="text-5xl">{seller.avatar}</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white text-sm">{seller.name}</p>
              <p className={`text-xs font-semibold mb-2 ${mood.color}`}>{currentMood}</p>
              <p className="text-xs text-slate-400 bg-black/20 rounded-lg px-3 py-2 leading-relaxed">
                💡 {mood.tip}
              </p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center shrink-0 ${timerColor}`}>
              <span className="text-lg font-bold leading-none">{timeLeft}</span>
              <span className="text-xs opacity-60">sec</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-500">⏱️ Time Left</span>
                <span className={timerColor.split(" ")[0]}>{timeLeft}s</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${timerBg}`}
                  style={{ width: `${(timeLeft / 60) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">💰 Price Progress</span>
              <span className="text-xs font-bold text-emerald-400">Saved ${savings}</span>
            </div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-red-400">List: ${product.listPrice}</span>
              <span className="font-bold text-white">Now: ${currentPrice}</span>
              <span className="text-emerald-400">Min: ~$?</span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className={`text-xs text-center mt-2 font-semibold ${progressColor.replace("bg-", "text-")}`}>
              {Math.round(progress)}% toward best deal!
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">🎯 Deal Meter</span>
              <span className="text-xs font-bold text-white">{currentLevel.label}</span>
            </div>
            <div className="flex gap-1 mb-2">
              {dealLevels.map((l, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full transition-all duration-500 ${progress >= l.pct ? l.color : "bg-slate-800"}`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              {dealLevels.map((l) => (
                <span key={l.label} className="flex-1 text-center truncate">{l.label.split(" ")[1]}</span>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800">
              {[
                { label: "Paid",   val: `$${currentPrice}`,          color: "text-white"        },
                { label: "Saved",  val: `$${savings}`,               color: "text-emerald-400"  },
                { label: "Off",    val: `${Math.round(progress)}%`,  color: currentLevel.color  },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-xs text-slate-600">{s.label}</p>
                  <p className={`text-base font-bold ${s.color}`}>{s.val}</p>
                </div>
              ))}
            </div>
          </div>

          {!gameOver && (
            <button
              onClick={() => endGame(currentPrice, messages.length)}
              className="w-full py-4 rounded-xl font-bold text-sm bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-all hover:shadow-[0_4px_20px_rgba(52,211,153,0.3)]"
            >
              ✅ Accept Deal — ${currentPrice}
            </button>
          )}
        </div>

        {/* ── RIGHT PANEL ─────────────────── */}
        <div className="flex flex-col gap-4">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 overflow-y-auto flex flex-col gap-4">
            {messages.length === 0 && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-slate-600 text-sm text-center">
                  🛒 Make your first offer to start negotiating!
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex items-end gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <span className="text-2xl shrink-0">
                  {msg.role === "user" ? "👤" : seller.avatar}
                </span>
                <div className={`max-w-[72%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                  ${msg.role === "user"
                    ? "bg-cyan-400 text-slate-950 font-medium rounded-br-sm"
                    : "bg-slate-800 text-white border border-slate-700 rounded-bl-sm"
                  }`}>
                  {msg.content}
                  {msg.price && (
                    <div className="mt-2 inline-block text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-1">
                      🏷️ Offer: ${msg.price}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-end gap-3">
                <span className="text-2xl">{seller.avatar}</span>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">

            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-slate-600 font-medium">Round {round} of {MAX_ROUNDS}</span>
              <button
                onClick={() => setShowTactics((p) => !p)}
                className="text-xs font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/25 px-3 py-1.5 rounded-lg hover:bg-purple-400/20 transition-all"
              >
                💡 Tactics Hint
              </button>
            </div>

            {showTactics && (
              <div className="bg-slate-800 rounded-xl p-3 mb-3">
                <p className="text-xs font-bold text-white mb-3">🎯 Click a tactic to use it:</p>
                <div className="grid grid-cols-2 gap-2">
                  {tactics.map((t) => (
                    <button
                      key={t.title}
                      onClick={() => { setMessage(t.example); setShowTactics(false); }}
                      className="text-left p-3 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400/50 hover:bg-slate-800 transition-all"
                    >
                      <p className="text-xs font-bold text-purple-400 mb-1">{t.title}</p>
                      <p className="text-xs text-slate-400 italic leading-snug">"{t.example}"</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 items-end">
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading || gameOver}
                placeholder={gameOver ? "Game over! Check your results below." : "Type your offer or argument... (Enter to send)"}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none resize-none focus:border-cyan-400 transition-all disabled:opacity-40"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim() || isLoading || gameOver}
                className="w-12 h-12 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xl flex items-center justify-center shrink-0 hover:bg-cyan-300 transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100"
              >
                {isLoading ? "⏳" : "→"}
              </button>
            </div>
          </div>

          {gameOver && gameResult && (
            <div className="bg-slate-900 border border-cyan-400/40 rounded-2xl p-6 shadow-[0_0_40px_rgba(34,211,238,0.08)]">
              <h2 className="text-2xl font-extrabold text-center text-white mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                🎉 Negotiation Complete!
              </h2>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Final Price", val: `$${gameResult.finalPrice}`, color: "text-white"       },
                  { label: "You Saved",   val: `$${gameResult.savings}`,    color: "text-emerald-400" },
                  { label: "Savings",     val: `${gameResult.savingsPercent}%`, color: "text-purple-400" },
                  { label: "Rounds",      val: gameResult.rounds,           color: "text-cyan-400"    },
                ].map((s) => (
                  <div key={s.label} className="bg-slate-800 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">{s.label}</p>
                    <p className={`text-2xl font-extrabold ${s.color}`}
                      style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                      {s.val}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mb-6">
                <span className="text-lg font-bold"
                  style={{ color: getPerformanceLabel(gameResult.savingsPercent).color }}>
                  {getPerformanceLabel(gameResult.savingsPercent).label}
                </span>
              </div>

              {earnedBadges.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    🎖️ Badges Earned
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {earnedBadges.map((b) => (
                      <span key={b.id} className="text-xs font-bold px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-cyan-400">
                        {b.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate("/leaderboard")}
                  className="py-4 rounded-xl font-bold bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition-all"
                >
                  🏆 Leaderboard
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="py-4 rounded-xl font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all hover:shadow-[0_4px_20px_rgba(34,211,238,0.3)]"
                >
                  🔄 Play Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}