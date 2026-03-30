import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./routes/chat.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed origins (dev + production)
const allowedOrigins = [
  "http://localhost:5173",
  "https://negotix-h8c2.onrender.com",
];

// ✅ CORS setup (robust)
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api", chatRoute);

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "Server is running!",
    message: "Welcome to Negotix API",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});