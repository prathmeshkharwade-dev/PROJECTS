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

    // Build system prompt based on product and difficulty
    const systemPrompt = buildSellerPrompt(product, difficulty, round || 1);

    // Format conversation history for Groq
    const messages = [
      ...history.map((msg) => ({
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
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages,
      ],
      temperature: 0.8, // Creative but controlled responses
      max_tokens: 200,  // Keep responses short
    });

    // Extract raw response
    const rawResponse = completion.choices[0].message.content;

    // Parse important values from response
    const price = extractPrice(rawResponse);
    const mood = extractMood(rawResponse);
    const cleanedMessage = cleanMessage(rawResponse);

    // Send response to frontend
    res.json({
      message: cleanedMessage,
      price: price,
      mood: mood,
      round: round,
    });

  } catch (error) {
    console.error("Groq API Error:", error.message);
    res.status(500).json({
      error: "Could not connect to AI seller. Please try again.",
    });
  }
}