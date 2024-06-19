import axios from 'axios';

export const BaseURL = 'https://tasks-rest-api-8u4m.onrender.com/api/';

export const axiosInst = axios.create({
  // baseURL: 'http://localhost:8080/api/',
  baseURL: BaseURL,
});

export const setAuthHeader = token => {
  axiosInst.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axiosInst.defaults.headers.common.Authorization = '';
};
