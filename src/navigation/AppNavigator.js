import React, { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import useAuth from '../hooks/useAuth';
import IntroScreen from '../screens/splash/IntroScreen';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

export default function AppNavigator() {
  const { user, loading } = useAuth();
  const [introTerminada, setIntroTerminada] = useState(false);

  const handleFinish = useCallback(() => setIntroTerminada(true), []);

  // 1) Animação MeuAcesso (5s)  2) Login (ou Início, se já tiver sessão)
  if (!introTerminada) {
    return <IntroScreen ready={!loading} onFinish={handleFinish} />;
  }

  return (
    <NavigationContainer>
      {/* Depois da animação: ícones da barra de estado escuros (hora visível no fundo claro) */}
      <StatusBar style="dark" />
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}