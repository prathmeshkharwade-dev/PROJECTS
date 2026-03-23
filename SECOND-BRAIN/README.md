# 🧠 Second Brain — Knowledge Graph

> AI-powered personal knowledge management app that automatically organizes, connects and resurfaces your saved content.

## ✨ Features

- 🕸️ **Knowledge Graph** — D3.js force-directed graph showing content connections
- 🤖 **AI Auto-tagging** — Groq AI automatically tags and summarizes saved content
- 🔍 **Semantic Search** — Pinecone vector DB finds related content without exact keywords
- 📁 **Collections** — Organize items into custom folders
- 📝 **Notes & Highlights** — Add personal notes to any saved item
- 🌙 **Dark / Light Theme** — Toggle between themes
- 📱 **Mobile Responsive** — Works on all devices
- 🔐 **JWT Auth** — Secure user authentication

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Graph | D3.js |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Vector DB | Pinecone |
| AI Tagging | Groq (Llama 3.3) |
| Embeddings | HuggingFace |
| Auth | JWT |

## 🚀 Setup

### 1. Clone karo
```bash
git clone https://github.com/YOUR_USERNAME/second-brain.git
cd second-brain
```

### 2. Server setup
```bash
cd server
npm install
```

`server/.env` banao:
```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GROQ_API_KEY=your_groq_key
PINECONE_API_KEY=your_pinecone_key
PINECONE_INDEX=second-brain
HF_TOKEN=your_huggingface_token
```

### 3. Client setup
```bash
cd client
npm install
```

`client/.env` banao:
```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Run karo
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2  
cd client && npm run dev
```

## 📸 Screenshots

> Coming soon

## 👨‍💻 Author

**Prathmesh Kharwade**