import axios from "axios";

// Base URL from .env file
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("VITE_API_URL is not defined");
}

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Send message to AI seller
export const sendMessage = async ({
  message,
  history,
  product,
  difficulty,
  round,
}) => {
  try {
    const response = await api.post("/api/chat", {
      message,
      history,
      product,
      difficulty,
      round,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || "Something went wrong!",
    };
  }
};