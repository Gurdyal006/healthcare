import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/", // same origin
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // VERY IMPORTANT for cookies
});

export default axiosInstance;