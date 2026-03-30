import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home.jsx";
import Game from "./pages/Game.jsx";
import Profile from "./pages/Profile.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// 1️⃣ SECURITY GUARD: Blocks access if not logged in
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// 2️⃣ REVERSE GUARD: Redirects logged-in users away from Login/Register
const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Hide Navbar on specific pages
  const hiddenRoutes = ["/game", "/login", "/register"];
  if (hiddenRoutes.includes(location.pathname)) return null;

  const isLoggedIn = !!localStorage.getItem("token");
  
  // Safe JSON Parsing to prevent crashes
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch (e) {
    user = {};
  }

  // Handle logout and clear ALL relevant storage
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username"); // 👈 FIX: Added this to sync with Home.js logic
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 font-bold text-xl text-cyan-400 tracking-tight"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
        Negotix
      </button>

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

        {isLoggedIn ? (
          <div className="relative ml-2">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center text-xs font-bold">
                {user.username ? user.username.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="text-sm font-medium text-slate-300">Profile ▾</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-800 mb-1">
                  <p className="text-sm font-bold text-white truncate">{user.username || "Player"}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email || ""}</p>
                </div>
                <button
                  onClick={() => { setShowDropdown(false); navigate("/profile"); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
                >
                  👤 View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-800 transition-colors"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="ml-2 px-4 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_8px_#22d3ee]"
          >
            Login
          </button>
        )}
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
          {/* Public Routes - Wrapped with PublicRoute to prevent double login */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/game" element={<ProtectedRoute><Game /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Catch-all: Redirect unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;