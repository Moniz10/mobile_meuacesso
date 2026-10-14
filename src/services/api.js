import axios from 'axios';

import { API_URL, STORAGE_KEYS } from '../constants/config';
import { getItem } from './storage';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

// Envia o token em todos os pedidos, quando existir.
api.interceptors.request.use(async (config) => {
  const token = await getItem(STORAGE_KEYS.token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
