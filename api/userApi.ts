import { axiosUserApi } from 'axios.config';
import { ICreateUser } from '../types/ICreateUser';
import { IUpdateUser } from '../types/IUpdateUser';
import { IBasicAuthUser } from '../types/IBasicAuthUser';

export const getUser = async (email: string) => {
  axiosUserApi.defaults.baseURL = process.env.API_BASE_URL ?? axiosUserApi.defaults.baseURL;
  try {
    const response = await axiosUserApi.post('/api/v1/users/user', { email });
    return response;
  } catch (error) {
    return null;
  }
};

export const createUser = async (userData: ICreateUser) => {
  axiosUserApi.defaults.baseURL = process.env.API_BASE_URL ?? axiosUserApi.defaults.baseURL;
  try {
    const response = await axiosUserApi.post('/api/v1/users/user/create', userData);
    console.log(response.status);
    return response;
  } catch (error) {   
    if (error.response && error.response.status === 409) {
      throw error;
    }
    return null;
  }
};

export const updateUser = async (userData: IUpdateUser) => {
  axiosUserApi.defaults.baseURL = process.env.API_BASE_URL ?? axiosUserApi.defaults.baseURL;
  try {
    const response = await axiosUserApi.put('/api/v1/users/user/update', userData);
    return response;
  } catch (error) {
    return null;
  }
};

export const authenticate = async (userData: IBasicAuthUser) => {
  axiosUserApi.defaults.baseURL = process.env.API_BASE_URL ?? axiosUserApi.defaults.baseURL;
  try {
    const response = await axiosUserApi.post('/api/v1/users/user/authenticate', userData);
    return response;
  } catch (error) {
    return null;
  }
};


