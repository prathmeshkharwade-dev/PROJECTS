<h1 align="center">Second Brain</h1>

<p align="center">
  AI-powered personal knowledge management app for saving, organizing, and exploring content as a visual knowledge graph.
</p>

<p align="center">
  <a href="https://second-brain-erja.onrender.com/"><strong>Live Demo</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Pinecone-Vector_Search-6F42C1?style=for-the-badge" alt="Pinecone" />
</p>

## About

Second Brain helps users store useful content, organize it into collections, and revisit it through an interactive graph interface. It combines AI-generated summaries with semantic search to make saved knowledge easier to explore.

## Features

- Interactive knowledge graph with `D3.js`
- Semantic search with `Pinecone`
- AI-generated tags and summaries with `Groq`
- Collections and file upload support
- JWT authentication
- Responsive dark/light interface

## Tech Stack

- `React` + `Vite` + `Tailwind CSS`
- `Node.js` + `Express`
- `MongoDB`
- `Pinecone`
- `Hugging Face Embeddings`
- `Groq`

## Environment Variables

### `server/.env`

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=your_pinecone_index_name
HF_TOKEN=your_huggingface_token
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### `client/.env`

```env
VITE_API_URL=http://localhost:3000/api
```

## Run Locally

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Project Structure

```text
SECOND-BRAIN/
├── client/
├── server/
└── README.md
```

## Author

**Prathmesh Kharwade**
