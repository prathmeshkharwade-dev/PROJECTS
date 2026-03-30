// frontend/src/config.js
const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://negotix-backend.onrender.com";

export default API_URL;