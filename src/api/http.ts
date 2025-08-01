import axios from 'axios';
import { getAuthToken } from '../store/auth';

/**
 * Базовый клиент API.
 *
 * URL задаётся через переменную окружения VITE_API_URL.
 * В CI/CD задаём её в Secrets репозитория ("VITE_API_URL = https://api.lead-schem.ru").
 */
const raw = (import.meta.env.VITE_API_URL as string | undefined) ?? 'https://api.lead-schem.ru';
// если по ошибке придёт http, заменяем на https
const baseURL = raw.replace(/^http:/, 'https:');

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// добавляем Bearer токен, если есть
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api; 