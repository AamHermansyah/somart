'use client'

import { User } from '@prisma/client';
import create from 'zustand';

interface userState {
  user: null | User;
  token: null | string;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  removeUserAndToken: () => void;
}

const useUserStore = create<userState>((set) => {
  return ({
    user: null,
    token: null,
    setUser: (user) => {
      if (user) localStorage.setItem('user', JSON.stringify(user));
      set({ user });
    },
    setToken: (token) => {
      if (token) localStorage.setItem('token', token);
      set({ token });
    },
    removeUserAndToken: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      set({ user: null, token: null });
    }
  })
});

export default useUserStore;