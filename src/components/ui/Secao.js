import React from 'react';
import { Text, View } from 'react-native';

// Agrupa campos com um pequeno título (ex.: "Dados pessoais").
export default function Secao({ titulo, children }) {
  return (
    <View className="mb-2">
      <Text className="font-manrope-bold text-xs text-muted uppercase tracking-widest mb-3">
        {titulo}
      </Text>
      {children}
    </View>
  );
}