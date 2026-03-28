negotix/
│
├── 📁 frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx          ← Products + Difficulty select
│   │   │   ├── Game.jsx          ← Main game with timer
│   │   │   └── Leaderboard.jsx   ← Global scores + badges
│   │   │
│   │   ├── components/
│   │   │   ├── ChatBox.jsx       ← Messages
│   │   │   ├── MessageInput.jsx  ← Type karo
│   │   │   ├── PriceBar.jsx      ← Animated price tracker
│   │   │   ├── MoodIndicator.jsx ← AI seller mood 😊😠
│   │   │   ├── RoundTimer.jsx    ← 60 second countdown
│   │   │   ├── TacticHints.jsx   ← Tips popup
│   │   │   ├── DealMeter.jsx     ← Kitne paas ho min price
│   │   │   ├── ProductCard.jsx   ← Product info
│   │   │   └── BadgeDisplay.jsx  ← Achievements
│   │   │
│   │   ├── utils/
│   │   │   ├── api.js            ← Backend calls
│   │   │   ├── leaderboard.js    ← localStorage logic
│   │   │   └── badges.js         ← Badge calculation
│   │   │
│   │   └── constants/
│   │       ├── products.js       ← 5 products ka data
│   │       └── tactics.js        ← Hints ka data
│   │
│   └── package.json
│
├── 📁 backend/
│   ├── server.js
│   ├── routes/
│   │   └── chat.js
│   ├── controllers/
│   │   └── chatController.js     ← Groq API logic
│   ├── prompts/
│   │   └── sellerPrompt.js       ← AI seller ka system prompt
│   └── .env                      ← GROQ_API_KEY safe hai yahan
│
└── README.md