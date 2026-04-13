import { saveMessage, getChatHistory } from '../services/chat.service.js';
import { generateAIReply } from '../services/ai.service.js';
import { handleAction } from '../utils/actionHandler.js';

// POST /api/chat
const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // 1. Save user message
    await saveMessage(message, 'user');

    // 2. Get last 10 messages for context
    const chatHistory = await getChatHistory(10);

    // 3. Generate AI reply
    const aiReply = await generateAIReply(message, chatHistory);

    let finalResult = null;

    // 4. If action → handle it
    if (aiReply.type === 'action') {
      finalResult = await handleAction(aiReply.action, aiReply.value);
    }

    // 5. Save AI reply to DB
    const savedAIMessage = await saveMessage(
      aiReply.type === 'response'
        ? aiReply.message
        : JSON.stringify(aiReply),
      'ai'
    );

    // 6. Return full response
    res.status(201).json({
      success: true,
      userMessage: message,
      aiReply,
      ...(finalResult && { actionResult: finalResult }),
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