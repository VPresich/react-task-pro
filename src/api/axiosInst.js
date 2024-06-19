import axios from 'axios';

export const axiosInst = axios.create({
  baseURL: 'http://localhost:8080/api/',
  //baseURL: 'https://tasks-rest-api-8u4m.onrender.com/api/',
});

export const setAuthHeader = token => {
  axiosInst.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axiosInst.defaults.headers.common.Authorization = '';
};
