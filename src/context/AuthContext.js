import React, { createContext, useEffect, useState } from 'react';

import { STORAGE_KEYS } from '../constants/config';
import * as authService from '../services/authService';
import { getItem, removeItem, saveItem } from '../services/storage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ao abrir a app, recupera a sessão guardada.
  useEffect(() => {
    (async () => {
      try {
        const savedUser = await getItem(STORAGE_KEYS.user);
        if (savedUser) setUser(savedUser);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = async (email, password) => {
    const { token, user: loggedUser } = await authService.login(email, password);
    await saveItem(STORAGE_KEYS.token, token);
    await saveItem(STORAGE_KEYS.user, loggedUser);
    setUser(loggedUser);
  };

  const signUp = async (dados) => {
    const { token, user: newUser } = await authService.register(dados);
    await saveItem(STORAGE_KEYS.token, token);
    await saveItem(STORAGE_KEYS.user, newUser);
    setUser(newUser);
  };

  const signOut = async () => {
    await removeItem(STORAGE_KEYS.token);
    await removeItem(STORAGE_KEYS.user);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}