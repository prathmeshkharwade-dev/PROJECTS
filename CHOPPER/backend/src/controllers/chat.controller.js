import { saveMessage, getChatHistory } from '../services/chat.service.js';
import { generateAIReply } from '../services/ai.service.js';

// POST /api/chat
const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate input
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // 1. Save user message to DB
    await saveMessage(message, 'user');

    // 2. Get recent chat history for context (last 10 messages)
    const chatHistory = await getChatHistory(10);

    // 3. Generate AI reply
    const aiReply = await generateAIReply(message, chatHistory);

    // 4. Save AI reply to DB
    const savedAIMessage = await saveMessage(
      aiReply.type === 'response' ? aiReply.message : JSON.stringify(aiReply),
      'ai'
    );

    // 5. Return structured response
    res.status(201).json({
      success: true,
      userMessage: message,
      aiReply,
      savedAt: savedAIMessage.createdAt,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET /api/chat/history
const getChatHistoryHandler = async (req, res) => {
  try {
    const history = await getChatHistory();
    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export { handleChat, getChatHistoryHandler };