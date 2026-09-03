import axios from "axios";
import { getToken, isTokenExpired, logoutUser } from "./authService.js";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    if (isTokenExpired(token)) {
      logoutUser();
      window.location.replace("/login?sessionExpired=true");
      return Promise.reject(new Error("Session expired."));
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logoutUser();
      if (window.location.pathname !== "/login") {
        window.location.replace("/login?sessionExpired=true");
      }
    } else if (error.response?.status === 403) {
      window.location.replace("/unauthorized");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
