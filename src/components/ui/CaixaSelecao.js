import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Caixa de seleção dentro de um quadrado com borda de 1px.
export default function CaixaSelecao({ marcado, onChange, texto }) {
  return (
    <Pressable
      onPress={() => onChange(!marcado)}
      className={`flex-row items-start gap-3 rounded-2xl border p-4 ${
        marcado ? 'border-primary bg-primary-50' : 'border-line bg-field'
      }`}
    >
      <View
        className={`w-6 h-6 rounded-lg items-center justify-center border ${
          marcado ? 'bg-primary border-primary' : 'bg-white border-line'
        }`}
      >
        {marcado && <Feather name="check" size={15} color="#FFFFFF" />}
      </View>
      <Text className="flex-1 font-manrope-medium text-sm leading-5 text-ink">{texto}</Text>
    </Pressable>
  );
}