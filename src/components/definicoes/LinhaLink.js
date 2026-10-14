import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Linha tocável com ícone, texto, valor opcional à direita e seta.
export default function LinhaLink({ icone, titulo, valor, onPress }) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-4 px-4 py-4 active:bg-field">
      <View className="w-10 h-10 items-center justify-center rounded-xl bg-primary-50">
        <Feather name={icone} size={19} color="#0F6B4F" />
      </View>
      <Text className="flex-1 font-manrope-semibold text-base text-ink">{titulo}</Text>
      {valor ? <Text className="font-manrope-medium text-sm text-muted">{valor}</Text> : null}
      <Feather name="chevron-right" size={20} color="#9AA39F" />
    </Pressable>
  );
}