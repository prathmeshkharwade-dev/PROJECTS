import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../constants/products.js";

const DIFFICULTIES = [
  { id: "easy",   icon: "😊", label: "Easy",   desc: "Friendly seller — great for beginners!",  color: "text-emerald-400", border: "border-emerald-400", bg: "bg-emerald-400/10" },
  { id: "medium", icon: "🧔", label: "Medium", desc: "Shrewd merchant — needs smart tactics!",   color: "text-amber-400",   border: "border-amber-400",   bg: "bg-amber-400/10"   },
  { id: "hard",   icon: "👔", label: "Hard",   desc: "Strict businessman — experts only!",       color: "text-red-400",     border: "border-red-400",     bg: "bg-red-400/10"     },
];

export default function Home() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct]     = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
  const [playerName, setPlayerName]               = useState("");
  const [error, setError]                         = useState("");

  const handleStart = () => {
    if (!playerName.trim()) return setError("Please enter your name!");
    if (!selectedProduct)   return setError("Please select a product!");
    navigate("/game", {
      state: { product: selectedProduct, difficulty: selectedDifficulty, playerName: playerName.trim() },
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* ── HERO ───────────────────────────── */}
        <div className="text-center mb-14">
          {/* Glow */}
          <div className="absolute left-1/2 -translate-x-1/2 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none"
            style={{ width: "600px", height: "300px" }} />

          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/25 mb-5">
            🎮 AI Negotiation Game
          </span>

          <h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-5 text-white"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Outsmart the{" "}
            <span className="text-cyan-400">AI Seller.</span>
            <br />
            Win the{" "}
            <span className="text-amber-400">Best Deal.</span>
          </h1>

          <p className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
            Negotiate with an AI merchant, use smart tactics,
            and climb the global leaderboard!
          </p>
        </div>

        {/* ── NAME INPUT ─────────────────────── */}
        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3 flex items-center gap-3">
            Your Name
            <span className="flex-1 h-px bg-slate-800" />
          </p>
          <input
            type="text"
            placeholder="Enter your name to get started..."
            maxLength={20}
            value={playerName}
            onChange={(e) => { setPlayerName(e.target.value); setError(""); }}
            className="w-full px-5 py-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-600 text-base outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
          />
        </div>

        {/* ── DIFFICULTY ─────────────────────── */}
        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3 flex items-center gap-3">
            Select Difficulty
            <span className="flex-1 h-px bg-slate-800" />
          </p>
          <div className="grid grid-cols-3 gap-4">
            {DIFFICULTIES.map((d) => {
              const isActive = selectedDifficulty === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDifficulty(d.id)}
                  className={`relative p-5 rounded-xl border-2 text-center cursor-pointer transition-all duration-200
                    ${isActive
                      ? `${d.border} ${d.bg} shadow-lg`
                      : "border-slate-800 bg-slate-900 hover:border-slate-600 hover:bg-slate-800"
                    }`}
                >
                  {/* Active dot */}
                  {isActive && (
                    <span className={`absolute top-3 right-3 w-2 h-2 rounded-full ${d.bg} ${d.color} border ${d.border}`} />
                  )}
                  <span className="text-3xl block mb-3">{d.icon}</span>
                  <p className={`font-bold text-base mb-1 ${isActive ? d.color : "text-white"}`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {d.label}
                  </p>
                  <p className="text-xs text-slate-400 leading-snug">{d.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── PRODUCTS ───────────────────────── */}
        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3 flex items-center gap-3">
            Select a Product
            <span className="flex-1 h-px bg-slate-800" />
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {PRODUCTS.map((p) => {
              const isSelected = selectedProduct?.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => { setSelectedProduct(p); setError(""); }}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200
                    ${isSelected
                      ? "border-cyan-400 bg-cyan-400/5 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                      : "border-slate-800 bg-slate-900 hover:border-slate-600 hover:bg-slate-800 hover:-translate-y-1"
                    }`}
                >
                  {/* Selected tag */}
                  {isSelected && (
                    <span className="absolute top-2 right-2 text-xs font-bold bg-cyan-400 text-black px-2 py-0.5 rounded-full">
                      ✓
                    </span>
                  )}

                  {/* Emoji */}
                  <span className="text-4xl block text-center mb-3">{p.emoji}</span>

                  {/* Category */}
                  <p className="text-xs font-bold tracking-wider uppercase text-cyan-400 mb-1">
                    {p.category}
                  </p>

                  {/* Name */}
                  <p className="text-sm font-bold text-white mb-2 leading-snug"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {p.name}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">
                    {p.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-xs text-slate-600">List Price</span>
                    <span className="text-sm font-bold text-amber-400"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      ${p.listPrice}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── ERROR ──────────────────────────── */}
        {error && (
          <p className="text-center text-red-400 text-sm mb-4 font-medium">
            ⚠️ {error}
          </p>
        )}

        {/* ── START BUTTON ───────────────────── */}
        <button
          onClick={handleStart}
          disabled={!playerName || !selectedProduct}
          className="w-full py-5 rounded-xl text-lg font-bold tracking-tight transition-all duration-200
            bg-cyan-400 text-slate-950 hover:bg-cyan-300 hover:shadow-[0_4px_30px_rgba(34,211,238,0.4)] hover:-translate-y-0.5
            disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          🚀 Start Negotiation
        </button>

      </div>
    </div>
  );
}