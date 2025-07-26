import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (t: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  setToken: (t) => {
    if (t) {
      localStorage.setItem('token', t);
    } else {
      localStorage.removeItem('token');
    }
    set({ token: t });
  },
}));

export const getAuthToken = () => localStorage.getItem('token'); 