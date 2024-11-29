import axios from "axios";
const baseURL = "https://app-back-end-nm7b.onrender.com";
// const baseURL = "http://localhost:5000";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default api;
