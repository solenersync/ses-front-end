import axiosInstance from 'axios.config';
import { ICreateUser } from '../types/ICreateUser';
import { IUpdateUser } from '../types/IUpdateUser';

export const getUser = async (email: string) => {  
  try {
    axiosInstance.defaults.baseURL = process.env.API_BASE_URL;
    const response = await axiosInstance.post('/api/v1/users/user', { email });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const createUser = async (userData: ICreateUser) => {
  axiosInstance.defaults.baseURL = process.env.API_BASE_URL;
  const response = await axiosInstance.post('/api/v1/users/user/create', userData);
  return response;
};

export const updateUser = async (userData: IUpdateUser) => {
  axiosInstance.defaults.baseURL = process.env.API_BASE_URL; 
  try {
    const response = await axiosInstance.put('/api/v1/users/user/update', userData);
    return response;
  } catch (error) {
    return null;
  }
};
