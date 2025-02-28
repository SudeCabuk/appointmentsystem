import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080", // Çevre değişkeni veya varsayılan değer
  timeout: 10000, // Zaman aşımı süresi
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Tüm isteklerden önce çalışır)
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Tüm yanıtlar alındıktan sonra çalışır)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user")
      Cookies.remove("user");
    }
    return Promise.reject(error);
  }
);

export default api;
