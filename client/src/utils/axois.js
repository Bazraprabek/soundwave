import axios from "axios";

const baseURL = "http://localhost:5000";

const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.request.use((req) => {
  if (!token) {
    const token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null;

    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
