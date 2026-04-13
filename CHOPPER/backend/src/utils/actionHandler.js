import { generateAIReply } from '../services/ai.service.js';

const handleAction = async (action, value) => {
  switch (action) {

    // 🌐 Open URL
    case 'open_url':
      return {
        action: 'open_url',
        url: value,
        message: `Opening ${value}`,
      };

    // 🔍 Search Google
    case 'search_google':
      return {
        action: 'search_google',
        url: `https://www.google.com/search?q=${encodeURIComponent(value)}`,
        message: `Searching for: ${value}`,
      };

    // ⏰ Get Current Time
    case 'get_time':
      const now = new Date();
      const time = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      });
      const date = now.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Kolkata',
      });
      return {
        action: 'get_time',
        time,
        date,
        message: `Bhai, abhi time hai ${time}, aur aaj hai ${date}`,
      };

    // 💻 Run Command (mock)
    case 'run_command':
      return {
        action: 'run_command',
        command: value,
        message: `Command ready to execute: ${value}`,
        note: 'Frontend will execute this on the system',
      };

    // 🧠 Generate Code
    case 'generate_code':
      const codeReply = await generateAIReply(
        `Generate clean code for: ${value}. Return only the code with brief comments. No explanation outside code.`
      );
      return {
        action: 'generate_code',
        requirement: value,
        code: codeReply.message || codeReply,
        message: `Code generated for: ${value}`,
      };

    // 📖 Explain Code
    case 'explain_code':
      const explainReply = await generateAIReply(
        `Explain this code in simple Hinglish in 3-4 lines: ${value}`
      );
      return {
        action: 'explain_code',
        code: value,
        explanation: explainReply.message || explainReply,
        message: 'Code explained!',
      };

    // ❓ Unknown Action
    default:
      return {
        action: 'unknown',
        message: `Bhai, ye action abhi supported nahi hai: ${action}`,
      };
  }
};

export { handleAction };