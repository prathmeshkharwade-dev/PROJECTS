import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLeaderboard,
  clearLeaderboard,
  getPerformanceLabel,
} from "../utils/leaderboard.js";
import { getEarnedBadges, buildStats, BADGES } from "../utils/badges.js";

export default function Leaderboard() {
  const navigate = useNavigate();
  const [entries,      setEntries]     = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState([]);

  // ── FIX: Dynamic API URL for Deployment ──
  const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://negotix-backend.onrender.com"; 

  // Fetch global leaderboard from MongoDB and personal badges from Local Storage
  useEffect(() => {
    const fetchGlobalLeaderboard = async () => {
      try {
        // ── FIX: Uses Dynamic URL instead of hardcoded localhost ──
        const response = await fetch(`${API_BASE_URL}/api/leaderboard`);
        const dbData = await response.json();
        
        // Map database fields to match your beautiful table UI
        const formattedData = dbData.map(dbEntry => ({
          id: dbEntry._id,
          playerName: dbEntry.username,
          date: new Date(dbEntry.createdAt).toLocaleDateString(),
          productName: dbEntry.productName || "Unknown", 
          savings: dbEntry.savedAmount || 0,              
          savingsPercent: dbEntry.score, 
          difficulty: dbEntry.difficulty || "medium",   
          rounds: dbEntry.rounds || "-"                  
        }));
        
        setEntries(formattedData);
      } catch (error) {
        console.error("Error fetching leaderboard from database:", error);
      }
    };

    fetchGlobalLeaderboard();

    // Load personal badges from local storage so achievements remain intact
    const localData = getLeaderboard();
    const stats  = buildStats(localData);
    setEarnedBadges(getEarnedBadges(stats));
  }, [API_BASE_URL]);

  const handleClear = () => {
    clearLeaderboard();
    setEntries([]);
    setShowConfirm(false);
  };

  const getMedal = (i) =>
    i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`;

  const getDiffStyle = (diff) => {
    const d = diff?.toLowerCase();
    return d === "easy"   ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/30" :
           d === "medium" ? "text-amber-400   bg-amber-400/10   border-amber-400/30"   :
           d === "hard"   ? "text-red-400     bg-red-400/10     border-red-400/30"     :
                            "text-slate-400   bg-slate-800      border-slate-700";
  };

  const getRowStyle = (i) =>
    i === 0 ? "border-amber-400/40   bg-amber-400/5"   :
    i === 1 ? "border-slate-400/40   bg-slate-400/5"   :
    i === 2 ? "border-orange-400/40  bg-orange-400/5"  :
              "border-slate-800      bg-slate-900";

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-16">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* ── HEADER ──────────────────────── */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1
              className="text-4xl font-extrabold text-white mb-1"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              🏆 Leaderboard
            </h1>
            <p className="text-slate-500 text-sm">
              Top negotiators ranked by savings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all"
            >
              🚀 Play Now
            </button>
            
          </div>
        </div>

        {/* ── CONFIRM CLEAR ───────────────── */}
        {showConfirm && (
          <div className="mb-6 p-5 rounded-2xl bg-slate-900 border border-red-400/30">
            <p className="text-sm text-red-300 mb-4 text-center">
              ⚠️ Are you sure? All scores will be permanently deleted!
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleClear}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-400 transition-all"
              >
                Yes, Delete!
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-slate-700 text-white hover:bg-slate-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── EMPTY STATE ─────────────────── */}
        {entries.length === 0 && (
          <div className="text-center py-24">
            <span className="text-7xl block mb-5">🛒</span>
            <h2
              className="text-2xl font-bold text-white mb-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              No scores yet!
            </h2>
            <p className="text-slate-500 mb-8 text-sm">
              Complete a negotiation to appear on the leaderboard.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-4 rounded-xl font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all hover:shadow-[0_4px_20px_rgba(34,211,238,0.3)]"
            >
              🚀 Start Playing!
            </button>
          </div>
        )}

        {entries.length > 0 && (
          <div className="grid grid-cols-[1fr_320px] gap-6">

            {/* ── LEFT: SCORES TABLE ──────── */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-4 flex items-center gap-3">
                Rankings
                <span className="flex-1 h-px bg-slate-800" />
              </p>

              <div className="grid grid-cols-[50px_1fr_1fr_90px_70px_80px_70px] gap-3 px-4 py-3 mb-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                <span>Rank</span>
                <span>Player</span>
                <span>Product</span>
                <span>Saved</span>
                <span>%</span>
                <span>Diff</span>
                <span>Rounds</span>
              </div>

              <div className="flex flex-col gap-2">
                {entries.map((entry, i) => {
                  const perf = getPerformanceLabel(entry.savingsPercent);
                  return (
                    <div
                      key={entry.id}
                      className={`grid grid-cols-[50px_1fr_1fr_90px_70px_80px_70px] gap-3 items-center px-4 py-4 rounded-xl border transition-all hover:brightness-110 ${getRowStyle(i)}`}
                    >
                      <span className="text-xl font-bold">
                        {getMedal(i)}
                      </span>

                      <div>
                        <p className="font-bold text-sm text-white">
                          {entry.playerName}
                        </p>
                        <p className="text-xs text-slate-600">
                          {entry.date}
                        </p>
                      </div>

                      <p className="text-sm text-slate-400 truncate">
                        {entry.productName}
                      </p>

                      <p className="text-sm font-bold text-emerald-400">
                        ${entry.savings}
                      </p>

                      <p
                        className="text-sm font-bold"
                        style={{ color: perf.color }}
                      >
                        {entry.savingsPercent}%
                      </p>

                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full border text-center ${getDiffStyle(entry.difficulty)}`}
                      >
                        {entry.difficulty.toUpperCase()}
                      </span>

                      <p className="text-sm text-slate-500">
                        {entry.rounds}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT: BADGES ───────────── */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-4 flex items-center gap-3">
                Achievements
                <span className="flex-1 h-px bg-slate-800" />
              </p>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-500">
                    Badges Earned
                  </span>
                  <span className="text-xs font-bold text-cyan-400">
                    {earnedBadges.length} / {BADGES.length}
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                    style={{
                      width: `${(earnedBadges.length / BADGES.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {BADGES.map((badge) => {
                  const isEarned = earnedBadges.some((b) => b.id === badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`p-3 rounded-xl border transition-all ${
                        isEarned
                          ? "border-cyan-400/30 bg-cyan-400/5"
                          : "border-slate-800 bg-slate-900 opacity-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p
                          className={`text-sm font-bold ${isEarned ? "text-white" : "text-slate-500"}`}
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {badge.title}
                        </p>
                        <span
                          className={`text-xs font-bold ${isEarned ? "text-cyan-400" : "text-slate-600"}`}
                        >
                          {isEarned ? "✅" : "🔒"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-snug">
                        {badge.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}