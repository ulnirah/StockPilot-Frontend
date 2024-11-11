import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL

console.log(backendURL)

export  const api = axios.create({
  baseURL: backendURL,
});

