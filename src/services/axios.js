import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.STOCKPILOT_URL,
});

export default Axios;
