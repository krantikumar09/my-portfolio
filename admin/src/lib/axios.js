import axios from "axios";

const base_url = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: `${base_url}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios Interceptor to inject token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
