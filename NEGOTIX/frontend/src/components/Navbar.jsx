import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center justify-between px-6 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      <Link to="/" className="flex items-center gap-2 text-cyan-400 font-bold text-xl">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        Negotix
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/leaderboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
          🏆 Leaderboard
        </Link>
        
        {username ? (
          <div className="flex items-center gap-4 border-l border-slate-800 pl-6">
            <span className="text-sm text-slate-300 font-medium">👤 {username}</span>
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-1.5 rounded-lg hover:bg-red-400/20 transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}