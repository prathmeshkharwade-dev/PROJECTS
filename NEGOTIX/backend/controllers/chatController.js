import Groq from "groq-sdk";
import { buildSellerPrompt } from "../prompts/sellerPrompt.js";
import dotenv from "dotenv";

// Load .env file
dotenv.config();

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Extract price from AI response
function extractPrice(text) {
  const match = text.match(/CURRENT_OFFER:\s*\$?([\d,]+)/i);
  if (match) return parseInt(match[1].replace(/,/g, ""));
  return null;
}

// Extract mood from AI response
function extractMood(text) {
  const match = text.match(/MOOD:\s*(\w+)\s*([\u{1F300}-\u{1FFFF}]|\S+)/iu);
  if (match) return match[0].replace("MOOD:", "").trim();
  return "neutral 😐";
}

// Remove price and mood lines from message
function cleanMessage(text) {
  return text
    .replace(/CURRENT_OFFER:\s*\$?[\d,]+/gi, "")
    .replace(/MOOD:\s*.+/gi, "")
    .trim();
}

// Main controller function
export async function chatWithSeller(req, res) {
  try {
    const { message, history, product, difficulty, round } = req.body;

    // Validate required fields
    if (!message || !product || !difficulty) {
      return res.status(400).json({
        error: "Message, product and difficulty are required!",
      });
    }

    // Build system prompt
    const systemPrompt = buildSellerPrompt(product, difficulty, round || 1);

    // Safe history handling (FIXED)
    const messages = [
      ...(history || []).map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user",
        content: message,
      },
    ];

    // Call Groq API
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages,
      ],
      temperature: 0.8,
      max_tokens: 200,
    });

    // Safe response handling (FIXED)
    const rawResponse =
      completion?.choices?.[0]?.message?.content || "No response from AI";

    // Extract values
    const price = extractPrice(rawResponse);
    const mood = extractMood(rawResponse);
    const cleanedMessage = cleanMessage(rawResponse);

    // Send response
    res.json({
      message: cleanedMessage,
      price,
      mood,
      round,
    });

  } catch (error) {
    // Better logging (FIXED)
    console.error("Groq API Error:", error);

    res.status(500).json({
      error: "Could not connect to AI seller. Please try again.",
      details: error.message,
    });
  }
}