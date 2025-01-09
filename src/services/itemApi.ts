import axios from 'axios';
import {UserParams} from '../model';

const API_URL = 'https://dummyjson.com/products'; // Replace with your API endpoint
const USER_URL = 'https://reqres.in/api/login';
export const getItems = async (): Promise<UserParams[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getUsersInfo = async (userData: any): Promise<UserParams[]> => {
  const response = await axios.post(USER_URL, userData);
  console.log(response, 'res');
  return response.data;
};
