import { ISolarArray } from 'types/ISolarArray';
import { axiosSolarArrayApi } from 'axios.config';
import { ICreateSolarArray } from '../types/ICreateSolarArray';


export const getArrayData = async (userId: string) => {
  axiosSolarArrayApi.defaults.baseURL = process.env.API_BASE_URL ?? axiosSolarArrayApi.defaults.baseURL;
  try {
    const response = await axiosSolarArrayApi.get(`/api/v1/solar-arrays/array/user/${userId}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const createArray = async (arrayData: ICreateSolarArray) => {
  axiosSolarArrayApi.defaults.baseURL = process.env.API_BASE_URL ?? axiosSolarArrayApi.defaults.baseURL;
  try {
    const response = await axiosSolarArrayApi.post('/api/v1/solar-arrays/create', arrayData);
    return response;
  } catch (error) {
    return null;
  }
};


export const updateArray = async (arrayData: ISolarArray) => {
  axiosSolarArrayApi.defaults.baseURL = process.env.API_BASE_URL ?? axiosSolarArrayApi.defaults.baseURL;
  try {
    const response = await axiosSolarArrayApi.post('/api/v1/solar-arrays/update', arrayData);
    return response;
  } catch (error) {
    return null;
  }
};

export const solarArrayApi =  {
  getArrayData,
  createArray,
  updateArray,
}