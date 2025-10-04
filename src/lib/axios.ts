import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api/external",
  headers: {
    "Content-Type": "application/json",
  },
});
