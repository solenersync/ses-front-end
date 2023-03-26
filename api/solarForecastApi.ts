import { axiosSolarForecastApi } from 'axios.config';
import { ISolarForecastRequest } from '../types/ISolarForecastRequest';

export const getSolarForecast = async (arrayData: ISolarForecastRequest) => {
  axiosSolarForecastApi.defaults.baseURL = process.env.API_URL ?? axiosSolarForecastApi.defaults.baseURL;
  try {
    const response = await axiosSolarForecastApi.post('/api/v1/pv/daily', arrayData);
    return response;
  } catch (error) {
    return null;
  }
};
