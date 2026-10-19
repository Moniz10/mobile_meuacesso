import axios from 'axios';

import { API_URL, STORAGE_KEYS } from '../constants/config';
import { getItem } from './storage';

const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: { Accept: 'application/json' },
});

// Envia o token em todos os pedidos, quando existir.
api.interceptors.request.use(async (config) => {
  const token = await getItem(STORAGE_KEYS.token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Se o servidor disser que a sessão acabou (401), a app termina a sessão.
let aoExpirar = null;
export function aoSessaoExpirar(funcao) {
  aoExpirar = funcao;
}

api.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    const url = erro.config?.url || '';
    const eAutenticacao = url.includes('/login') || url.includes('/registro');
    if (erro.response?.status === 401 && !eAutenticacao) aoExpirar?.();
    return Promise.reject(erro);
  }
);

export default api;
