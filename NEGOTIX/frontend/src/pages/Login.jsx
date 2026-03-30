import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ── FIX: Dynamic API URL ──
  // Agar website localhost par hai toh local URL, warna Render ka live URL
  const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://your-backend-name.onrender.com"; // 👈 Yahan apna Render backend link daalein

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // ── FIX: Use API_BASE_URL instead of hardcoded localhost ──
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // --- FIXED STORAGE LOGIC ---
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("username", data.user.username); 
        
        navigate("/"); 
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 overflow-hidden text-white font-sans">
      
      {/* Abstract Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Glassmorphism Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
            <h1 className="text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Welcome Back
            </h1>
          </div>
          <p className="text-slate-400 text-sm">Login to continue your negotiation journey</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="player@negotix.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-lg p-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Authenticating..." : "Login to Play"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}