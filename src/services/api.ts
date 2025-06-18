import axios from 'axios';
// import { BASE_URL } from '@env';

// Sabit BASE_URL kullanıyoruz
const BASE_URL = 'https://api.escuelajs.co/api/v1';

// Axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    return Promise.reject(error);
  }
);

export default api; 