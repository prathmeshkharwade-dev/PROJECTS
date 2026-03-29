import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Game from "./pages/Game.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page - product selection */}
        <Route path="/" element={<Home />} />

        {/* Game page - actual negotiation */}
        <Route path="/game" element={<Game />} />

        {/* Leaderboard page - top players */}
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;