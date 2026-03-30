import express from "express";
import Score from "../models/Score.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * 🏆 GET: Fetch Global Leaderboard
 */
router.get("/", async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1 }) // Highest savings % first
      .limit(20);
    res.status(200).json(scores);
  } catch (error) {
    console.error("Leaderboard Fetch Error:", error);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
});

/**
 * 💾 POST: Save New Score
 */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { 
      score, 
      productName, 
      savedAmount, 
      rounds, 
      difficulty 
    } = req.body;

    // Validate if score exists
    if (score === undefined) {
      return res.status(400).json({ message: "Score is required" });
    }

    // Creating new score document
    const newScore = new Score({
      userId: req.user.id,        // From verifyToken middleware
      username: req.user.username, // From verifyToken middleware
      score: score,
      productName: productName || "Unknown Product",
      savedAmount: savedAmount || 0,
      rounds: rounds || 0,
      difficulty: difficulty || "medium"
    });

    const savedEntry = await newScore.save();
    res.status(201).json({
      success: true,
      message: "Score saved successfully!",
      data: savedEntry
    });
  } catch (error) {
    console.error("Leaderboard Save Error:", error);
    res.status(500).json({ message: "Failed to save score to database" });
  }
});

export default router;