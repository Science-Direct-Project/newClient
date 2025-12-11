
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';


const API_BASE = 'http://localhost:3000/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor -> attach token if present
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    try {
      const token = localStorage.getItem('token'); // or wherever you store JWT
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (err) {
      // ignore
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor -> central error handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // You can add global handling here (logout on 401, show toast, etc.)
    if (error?.response?.status === 401) {
      // optional: clear local auth and redirect to login
      localStorage.removeItem('token');
      // if you have history/router helper:
      // router.push('/login');
      console.warn('Unauthorized - token expired or invalid. Redirect to login (if configured).');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
