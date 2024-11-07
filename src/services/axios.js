import axios from "axios";
import.meta.env.BACKEND_URL

const backendURL = import.meta.env.BACKEND_URL

export  const api = axios.create({
  baseURL: backendURL,
});

