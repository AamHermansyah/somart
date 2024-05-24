'use client'

import useUserStore from '@/stores/user';
import { useEffect } from 'react'

function RefetchingUser() {
  const { setToken, setUser } = useUserStore();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!!user && !!token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
  }, []);

  return null;
}

export default RefetchingUser