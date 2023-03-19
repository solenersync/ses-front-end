import axios from 'axios';

const axiosUserApi = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:8081',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const axiosSolarArrayApi = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:8083',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const axiosSolarForecastApi = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:8082',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const authApi = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:8081',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export { axiosUserApi, axiosSolarArrayApi, axiosSolarForecastApi, authApi };