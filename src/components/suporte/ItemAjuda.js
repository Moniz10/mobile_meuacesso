import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Linha de ajuda (borda 1px): ícone verde, texto e seta.
export default function ItemAjuda({ icone, titulo, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-4 rounded-2xl border border-line bg-white px-4 h-16 mb-3 active:bg-field"
    >
      <View className="w-10 h-10 items-center justify-center rounded-xl bg-primary-50">
        <Feather name={icone} size={19} color="#0F6B4F" />
      </View>
      <Text className="flex-1 font-manrope-semibold text-base text-ink">{titulo}</Text>
      <Feather name="chevron-right" size={20} color="#9AA39F" />
    </Pressable>
  );
}