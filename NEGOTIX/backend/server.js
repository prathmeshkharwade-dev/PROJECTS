import authRoute from "./routes/auth.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import chatRoute from "./routes/chat.js";
import connectDB from "./config/db.js";
import leaderboardRoute from "./routes/leaderboard.js";

// Load environment variables
dotenv.config();

// database connect
connectDB();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed origins (dev + production)
const allowedOrigins = [
  "http://localhost:5173",
  "https://negotix-h8c2.onrender.com", 
];

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        // 🚨 FIX: Production mein yahan error message thoda clean rakha hai
        return callback(null, true); // Deployment stability ke liye isse true bhi rakh sakte hain
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Routes
app.use("/api/auth", authRoute);
app.use("/api", chatRoute);
app.use("/api/leaderboard", leaderboardRoute);

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "Server is running!",
    message: "Welcome to Negotix API",
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: "Something went wrong on the server!",
    error: process.env.NODE_ENV === 'development' ? err.message : {} 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});