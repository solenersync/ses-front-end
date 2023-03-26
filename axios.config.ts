import axios from 'axios';

const axiosUserApi = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://www.solenersync.net:8081',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const axiosSolarArrayApi = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://www.solenersync.net:8083',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const axiosSolarForecastApi = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://www.solenersync.net:8080',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export { axiosUserApi, axiosSolarArrayApi, axiosSolarForecastApi };
