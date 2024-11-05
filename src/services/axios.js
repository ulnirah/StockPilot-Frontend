import axios from "axios";

// const baseURL = process.env.STOCKPILOT_URL

export  const api = axios.create({
  baseURL: 'http://127.0.0.1:3000',
});

