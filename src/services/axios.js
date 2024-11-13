import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL

console.log(backendURL)

export  const api = axios.create({
  baseURL: backendURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});