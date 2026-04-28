# Negotix

<p align="center">
  <strong>Outsmart the AI seller. Win the best deal.</strong>
</p>

<p align="center">
  AI-powered negotiation game with live bargaining, difficulty modes, badges, and a global leaderboard.
</p>

<p align="center">
  <a href="https://negotix-h8c2.onrender.com">Live App</a>
</p>

## Screenshots

![Negotix Home](./docs/screenshots/home.png)
![Negotix Gameplay](./docs/screenshots/game.png)
![Negotix Leaderboard](./docs/screenshots/leaderboard.png)

## Features

- AI seller chat powered by `Groq`
- `Easy`, `Medium`, and `Hard` negotiation modes
- Product selection with multiple deal scenarios
- Global leaderboard and achievement badges
- Login, register, and profile pages

## Tech Stack

- Frontend: `React`, `Vite`, `Tailwind CSS`
- Backend: `Node.js`, `Express`, `MongoDB`, `JWT`

## Run Locally

```bash
cd frontend
npm install
npm run dev
```

```bash
cd backend
npm install
npm run dev
```

Create:

- `frontend/.env` -> `VITE_API_URL=http://localhost:5000`
- `backend/.env` -> `MONGO_URI`, `GROQ_API_KEY`, `JWT_SECRET`, `PORT=5000`
