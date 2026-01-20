import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
