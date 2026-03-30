import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Game from "./pages/Game.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on game page
  if (location.pathname === "/game") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      
      {/* Logo */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 font-bold text-xl text-cyan-400 tracking-tight"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
        Negotix
      </button>

      {/* Nav Links */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            location.pathname === "/"
              ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/25"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          🛒 Play
        </button>
        <button
          onClick={() => navigate("/leaderboard")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            location.pathname === "/leaderboard"
              ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/25"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          🏆 Leaderboard
        </button>
        <span className="ml-2 px-3 py-1 rounded-full text-xs font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/25">
          FREE
        </span>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;