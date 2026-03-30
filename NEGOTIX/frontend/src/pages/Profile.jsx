import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  
  // Retrieve user data safely
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    // ── FIX: Clear ALL session data ──
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username"); // 👈 Added to sync with Home.js logic
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-6 font-sans">
      <div className="max-w-2xl mx-auto">
        
        <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          👤 My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center sm:flex-row sm:items-start gap-6">
            
            {/* Avatar Placeholder */}
            <div className="w-24 h-24 rounded-full bg-cyan-400/20 border-2 border-cyan-400 flex items-center justify-center text-4xl shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              {/* Safety check for username letter */}
              {user.username ? user.username.charAt(0).toUpperCase() : "U"}
            </div>

            {/* User Details */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white mb-1">
                {user.username || "Negotiator"}
              </h2>
              <p className="text-slate-400 text-sm mb-6">
                {user.email || "No email provided"}
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <button 
                  onClick={() => navigate("/")}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                >
                  🎮 Play Game
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-red-400 border border-red-400/30 bg-red-400/10 hover:bg-red-400/20 transition-all"
                >
                  🚪 Logout
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}