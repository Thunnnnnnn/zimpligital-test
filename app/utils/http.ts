import axios from "axios";

const url = process.env.API_URL;

const api = axios.create({
  baseURL: url || "http://localhost:3000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
