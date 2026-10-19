import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import iniciais from '../../utils/iniciais';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import useTopoSeguro from '../../hooks/useTopoSeguro';
import { MenuLateral } from '../menu';

// Barra do topo: menu, marca MeuAcesso e o círculo do perfil.
// O botão ☰ abre o menu lateral.
export default function AppHeader() {
  const topo = useTopoSeguro();
  const navigation = useNavigation();
  const route = useRoute();
  const { user, signOut } = useAuth();
  const { mostrarToast } = useToast();
  const [menuAberto, setMenuAberto] = useState(false);

  const navegar = (rota) => {
    setMenuAberto(false);
    if (rota !== route.name) navigation.navigate(rota);
  };

  const sair = () => {
    setMenuAberto(false);
    signOut();
    mostrarToast('Sessão terminada', 'Até breve!');
  };

  return (
    <View className="bg-white border-b border-line" style={{ paddingTop: topo }}>
      <View className="h-16 flex-row items-center justify-between px-4">
        <Pressable
          onPress={() => setMenuAberto(true)}
          hitSlop={6}
          className="w-11 h-11 items-center justify-center rounded-xl border border-line bg-canvas active:bg-field"
        >
          <Feather name="menu" size={20} color="#14231C" />
        </Pressable>

        <View className="flex-row items-center gap-2">
          <View className="w-8 h-8 items-center justify-center rounded-lg bg-primary">
            <Feather name="log-in" size={16} color="#FFFFFF" />
          </View>
          <Text className="font-manrope-extrabold text-lg text-ink">MeuAcesso</Text>
        </View>

        {/* Círculo com as iniciais: toca-se para ver/editar os dados */}
        <Pressable
          onPress={() => navigation.navigate('Profile')}
          hitSlop={6}
          className="w-11 h-11 items-center justify-center rounded-full bg-primary active:bg-primary-700"
        >
          <Text className="font-manrope-extrabold text-sm text-white">{iniciais(user?.name) || '?'}</Text>
        </Pressable>
      </View>

      <MenuLateral
        visivel={menuAberto}
        onFechar={() => setMenuAberto(false)}
        rotaAtual={route.name}
        user={user}
        onNavegar={navegar}
        onSair={sair}
      />
    </View>
  );
}