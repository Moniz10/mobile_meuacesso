import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Caixa vermelha com a mensagem de erro (não mostra nada se não houver texto).
export default function CaixaErro({ texto }) {
  if (!texto) return null;

  return (
    <View className="flex-row items-start gap-3 rounded-2xl border border-[#F2C4BF] bg-[#FEF3F2] p-4 mb-4">
      <Feather name="alert-circle" size={18} color="#B42318" style={{ marginTop: 1 }} />
      <Text className="flex-1 font-manrope-medium text-sm leading-5 text-[#B42318]">{texto}</Text>
    </View>
  );
}
