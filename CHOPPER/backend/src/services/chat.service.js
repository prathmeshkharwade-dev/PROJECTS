import Chat from '../models/Chat.model.js';

// Save a single message to DB
const saveMessage = async (message, role) => {
  const chat = new Chat({ message, role });
  return await chat.save();
};

// Get chat history from DB (optional limit)
const getChatHistory = async (limit = 0) => {
  return await Chat.find()
    .sort({ createdAt: 1 })
    .limit(limit);
};

export { saveMessage, getChatHistory };