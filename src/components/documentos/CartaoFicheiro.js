import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Etiqueta } from '../app';

// Cartão (borda 1px) de um documento enviado: ícone, nome, data e estado.
export default function CartaoFicheiro({ ficheiro, onPress }) {
  const emFalta = ficheiro.estado === 'falta';

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-4 rounded-2xl border border-line bg-white p-4 mb-3 active:bg-field"
    >
      <View
        className={`w-12 h-12 items-center justify-center rounded-xl ${
          emFalta ? 'bg-field border border-line' : 'bg-primary-50'
        }`}
      >
        <Feather name={ficheiro.icone} size={21} color={emFalta ? '#5F6B66' : '#0F6B4F'} />
      </View>

      <View className="flex-1">
        <Text className="font-manrope-bold text-base text-ink">{ficheiro.titulo}</Text>
        <Text className="font-manrope-medium text-sm text-muted mt-0.5">{ficheiro.descricao}</Text>
      </View>

      <Etiqueta estado={ficheiro.estado} />
    </Pressable>
  );
}