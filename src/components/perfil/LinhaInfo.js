import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Linha só de leitura: ícone, etiqueta pequena e valor.
export default function LinhaInfo({ icone, rotulo, valor }) {
  return (
    <View className="flex-row items-center gap-4 px-4 py-4">
      <View className="w-10 h-10 items-center justify-center rounded-xl bg-field border border-line">
        <Feather name={icone} size={18} color="#5F6B66" />
      </View>
      <View className="flex-1">
        <Text className="font-manrope-medium text-xs text-muted">{rotulo}</Text>
        <Text className="font-manrope-semibold text-base text-ink mt-0.5">{valor}</Text>
      </View>
    </View>
  );
}