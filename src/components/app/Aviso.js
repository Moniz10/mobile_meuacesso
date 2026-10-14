import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Caixa de aviso amarela com ícone (ex.: privacidade).
export default function Aviso({ icone = 'shield', texto }) {
  return (
    <View className="flex-row items-start gap-3 rounded-2xl border border-[#F3DFAE] bg-[#FDF4DD] p-4">
      <Feather name={icone} size={19} color="#8A6410" style={{ marginTop: 1 }} />
      <Text className="flex-1 font-manrope-medium text-sm leading-5 text-[#5C4310]">{texto}</Text>
    </View>
  );
}