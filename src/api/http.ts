import axios from 'axios';

/**
 * Базовый клиент API.
 *
 * URL задаётся через переменную окружения VITE_API_URL.
 * В CI/CD задаём её в Secrets репозитория ("VITE_API_URL = https://api.lead-schem.ru").
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'https://api.lead-schem.ru',
  withCredentials: true,
});

export default api; 