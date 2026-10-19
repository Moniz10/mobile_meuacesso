import React, { createContext, useCallback, useEffect, useState } from 'react';

import { STORAGE_KEYS } from '../constants/config';
import { aoSessaoExpirar } from '../services/api';
import * as authService from '../services/authService';
import { removeItem, saveItem } from '../services/storage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signOut = useCallback(async () => {
    await removeItem(STORAGE_KEYS.token);
    await removeItem(STORAGE_KEYS.user);
    setUser(null);
  }, []);

  // Ao abrir a app NÃO se entra directo: apaga a sessão guardada e mostra o login.
  useEffect(() => {
    (async () => {
      try {
        await removeItem(STORAGE_KEYS.token);
        await removeItem(STORAGE_KEYS.user);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Se o servidor recusar o token (sessão acabou), volta ao login.
  useEffect(() => {
    aoSessaoExpirar(signOut);
  }, [signOut]);

  // identificador = email ou telemóvel
  const signIn = async (identificador, password) => {
    const { token, user: loggedUser } = await authService.login(identificador, password);
    await saveItem(STORAGE_KEYS.token, token);
    await saveItem(STORAGE_KEYS.user, loggedUser);
    setUser(loggedUser);
    return (loggedUser.name || '').split(' ')[0]; // primeiro nome, para o toast
  };

  // Só cria a conta. Depois o utilizador vai ao login e entra com as suas credenciais.
  const signUp = async (dados) => {
    await authService.register(dados);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
