import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import iniciais from '../../utils/iniciais';

// Cartão do topo do perfil: avatar, nome, código e estado da conta.
export default function CartaoPerfil({ nome, codigo }) {
  return (
    <View className="mt-6 items-center rounded-3xl border border-line bg-white px-6 py-7">
      <View className="w-24 h-24 items-center justify-center rounded-full bg-primary-50 border-4 border-white">
        <Text className="font-manrope-extrabold text-3xl leading-10 text-primary">
          {iniciais(nome)}
        </Text>
      </View>
      <Text className="font-manrope-extrabold text-2xl text-ink mt-4">{nome}</Text>
      <Text className="font-manrope-medium text-sm text-muted mt-1">Código {codigo}</Text>

      <View className="flex-row items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full bg-primary-50">
        <Feather name="check-circle" size={14} color="#0F6B4F" />
        <Text className="font-manrope-bold text-xs text-primary">Conta verificada</Text>
      </View>
    </View>
  );
}