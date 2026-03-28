import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./routes/chat.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // Vite frontend URL
  methods: ["GET", "POST"],
}));
app.use(express.json()); // Parse incoming JSON requests

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
  console.log(`Server running on http://localhost:${PORT}`);
});