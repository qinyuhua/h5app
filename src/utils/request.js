import axios from 'axios';

const queryString = require('querystring');

const service = axios.create({
  baseURL: '/',
  timeout: 10000,
  responseType: 'json',
  changeOrigin: true,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
  }
});

service.interceptors.request.use((config) => {
  config.method !== 'post' ? config.data = queryString.stringify({ ...config.data }) : config.params = { ...config.data };
  if (config.method === 'get') {
    config.url = config.url + '?' + config.data;
  }
  return config;
});

service.interceptors.response.use((response) => {
  const { data, status } = response;
  if (status === 200) {
    return data;
  }

  return response;
})

export default service;
