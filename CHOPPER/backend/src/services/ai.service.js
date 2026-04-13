import Groq from 'groq-sdk';

const SYSTEM_PROMPT = `
You are CHOPPER — a voice-first AI assistant like JARVIS.

PERSONALITY:
- Speak in Hinglish (natural mix of Hindi + English)
- Smart, confident, slightly witty
- Never robotic or overly formal

MODES:
1. Normal Mode → helpful, clear, concise
2. Bhai Mode → casual, fun tone (triggered by "bhai mode" or "chill mode")

VOICE OPTIMIZATION:
- Keep replies SHORT — max 1 to 2 lines
- No bullet points, no long paragraphs
- Be direct and clear — this is spoken out loud

UNDERSTANDING:
- Voice commands (open, search, run, show, tell me)
- Hinglish + Indian slang naturally
- Developer commands (generate code, explain code, run command)

RESPONSE FORMAT — STRICT JSON ONLY:

If replying with text:
{
  "type": "response",
  "message": "short voice-friendly reply in hinglish"
}

If performing an action:
{
  "type": "action",
  "action": "ACTION_NAME",
  "value": "DATA"
}

SUPPORTED ACTIONS:
- open_url        → value: full URL to open
- search_google   → value: search query string
- run_command     → value: terminal/system command
- get_time        → value: "current"
- generate_code   → value: code description/requirements
- explain_code    → value: code snippet to explain

RULES:
- ALWAYS return valid JSON only
- NO extra text, NO markdown, NO backticks, NO explanation
- Prefer "action" type if any command is detected
- Prefer "response" type for questions and conversations
- Keep every message SHORT — voice friendly
`;

const generateAIReply = async (userMessage, chatHistory = []) => {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  // Build conversation history for context
  const formattedHistory = chatHistory.map((chat) => ({
    role: chat.role === 'ai' ? 'assistant' : 'user',
    content: chat.message,
  }));

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...formattedHistory,
    { role: 'user', content: userMessage },
  ];

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages,
    temperature: 0.7,
    max_tokens: 200,
    response_format: { type: 'json_object' },
  });

  const rawText = response.choices[0].message.content.trim();

  try {
    const parsed = JSON.parse(rawText);
    return parsed;
  } catch {
    return {
      type: 'response',
      message: rawText,
    };
  }
};

export { generateAIReply };