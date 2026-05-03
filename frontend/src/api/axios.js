import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-production-53e0.up.railway.app/api",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;