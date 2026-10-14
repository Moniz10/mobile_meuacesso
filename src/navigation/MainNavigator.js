import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabBar } from '../components/app';
import CodigoScreen from '../screens/codigo/CodigoScreen';
import DefinicoesScreen from '../screens/definicoes/DefinicoesScreen';
import DocumentosScreen from '../screens/documentos/DocumentosScreen';
import HistoricoScreen from '../screens/historico/HistoricoScreen';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SuporteScreen from '../screens/suporte/SuporteScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Separadores do fundo: Início, Código, Documentos, Histórico.
function Separadores() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="Codigo" component={CodigoScreen} options={{ title: 'Código' }} />
      <Tab.Screen name="Documentos" component={DocumentosScreen} options={{ title: 'Documentos' }} />
      <Tab.Screen name="Historico" component={HistoricoScreen} options={{ title: 'Histórico' }} />
    </Tab.Navigator>
  );
}

// Ecrãs fora dos separadores (todos com cabeçalho próprio).
export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Separadores" component={Separadores} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Suporte" component={SuporteScreen} />
      <Stack.Screen name="Definicoes" component={DefinicoesScreen} />
    </Stack.Navigator>
  );
}