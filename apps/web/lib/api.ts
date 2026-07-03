import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 60 * 1000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error),
);

export default api;
