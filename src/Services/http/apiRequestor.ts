import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BACKEND_BASE_URL } from '../../Configs/ENV';

export const apiRequester: AxiosInstance = axios.create({
  baseURL: `${BACKEND_BASE_URL}/api`,
  timeout: 5000,
});

export const setRequestDefaultHeader = (
  requestconfig: AxiosRequestConfig,
  signal?: AbortSignal,
) => {
  const config = requestconfig;
  // 일단 이렇게 해두고 나중에 수정
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json;charset=utf-8',
  };

  if (signal) {
    config.signal = signal;
  }

  return config;
};
