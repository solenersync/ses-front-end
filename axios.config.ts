import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:8081',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
export default axiosInstance