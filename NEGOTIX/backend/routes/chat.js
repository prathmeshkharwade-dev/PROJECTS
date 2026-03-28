import express from "express";
import { chatWithSeller } from "../controllers/chatController.js";

const router = express.Router();

// POST /api/chat - Send message to AI seller
router.post("/chat", chatWithSeller);

export default router;