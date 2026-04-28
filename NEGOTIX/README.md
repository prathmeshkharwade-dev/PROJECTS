<h1 align="center">Negotix</h1>

<p align="center">
  AI-powered negotiation game where players bargain with virtual sellers, improve their tactics, and compete on a live leaderboard.
</p>

<p align="center">
  <a href="https://negotix-h8c2.onrender.com/"><strong>Live Demo</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Groq-AI_Seller-8E44AD?style=for-the-badge" alt="Groq" />
</p>

## About

Negotix turns negotiation into a game. Players choose a product, pick a difficulty level, and bargain with an AI seller that reacts with changing moods, offers, and tactics. Every completed deal can be saved to the leaderboard, while badges and achievements reward smart play.

## Screenshots

<p align="center">
  <img src="./docs/screenshots/home.png" alt="Negotix home screen" width="800" />
</p>

<p align="center">
  <img src="./docs/screenshots/game.png" alt="Negotiation gameplay screen" width="800" />
</p>

<p align="center">
  <img src="./docs/screenshots/leaderboard.png" alt="Leaderboard screen" width="390" />
  <img src="./docs/screenshots/profile.png" alt="Profile screen" width="390" />
</p>

## Features

- AI-powered seller chat with dynamic responses
- Multiple negotiation difficulty levels
- Product-based deal scenarios
- Live deal tracking with rounds, savings, and mood
- Leaderboard, badges, and achievements
- Login, registration, and protected profile routes

## Tech Stack

- `React` + `Vite` + `Tailwind CSS`
- `Node.js` + `Express`
- `MongoDB` + `Mongoose`
- `Groq`
- `JWT`

## Environment Variables

### `backend/.env`

```env
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
```

### `frontend/.env`

```env
VITE_API_URL=http://localhost:5000
```

## Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```text
NEGOTIX/
├── frontend/
├── backend/
└── docs/
```

## Author

**Prathmesh Kharwade**
