import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'ai'],
      required: true,
    },
  },
  {
    timestamps: true, // auto adds createdAt & updatedAt
  }
);

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;