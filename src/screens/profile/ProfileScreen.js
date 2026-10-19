import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { BarraVoltar, Grupo } from '../../components/app';
import { CartaoPerfil, LinhaInfo } from '../../components/perfil';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { mostrarToast } = useToast();
  const sair = () => {
    signOut();
    mostrarToast('Sessão terminada', 'Até breve!');
  };

  const nome = user?.name || 'Utilizador';
  const codigo = user?.numero || '----';

  return (
    <View className="flex-1 bg-canvas">
      <BarraVoltar titulo="Perfil" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <CartaoPerfil nome={nome} codigo={codigo} />

        <Grupo titulo="Dados pessoais">
          <LinhaInfo icone="user" rotulo="Nome completo" valor={nome} />
          <LinhaInfo icone="phone" rotulo="Telemóvel" valor={user?.telemovel || '—'} />
          <LinhaInfo icone="mail" rotulo="Email" valor={user?.email || '—'} />
        </Grupo>

        {/* Sem funcionalidade por agora */}
        <Pressable className="mt-6 h-14 flex-row items-center justify-center gap-2 rounded-2xl border border-primary bg-white active:bg-primary-50">
          <Feather name="edit-2" size={17} color="#0F6B4F" />
          <Text className="font-manrope-bold text-base text-primary">Editar perfil</Text>
        </Pressable>

        <Pressable
          onPress={sair}
          className="mt-3 h-14 flex-row items-center justify-center gap-2 rounded-2xl border border-[#F2C4BF] bg-[#FEF3F2] active:opacity-80"
        >
          <Feather name="log-out" size={17} color="#B42318" />
          <Text className="font-manrope-bold text-base text-[#B42318]">Terminar sessão</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}