import axios from 'axios';

const axiosUserApi = axios.create({
  // baseURL: process.env.API_BASE_URL || 'http://localhost:8081',
  baseURL: 'https://www.solenersync.net',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const axiosSolarArrayApi = axios.create({
  // baseURL: process.env.API_BASE_URL || 'http://localhost:8083',
  baseURL: 'https://www.solenersync.net',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const axiosSolarForecastApi = axios.create({
  // baseURL: process.env.API_BASE_URL || 'http://localhost:8080',
  baseURL: 'https://www.solenersync.net',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export { axiosUserApi, axiosSolarArrayApi, axiosSolarForecastApi };
