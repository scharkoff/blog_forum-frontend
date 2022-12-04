import axios from "axios";

// -- Базовый URL для отправки запросов
const instance = axios.create({
  baseURL: "https://sharkov-blog.onrender.com" || "http://localhost:4444/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://sharkov-blog.onrender.com",
  },
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
