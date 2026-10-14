import React from 'react';
import { Switch, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Linha com ícone, texto e interruptor ligado/desligado.
export default function LinhaInterruptor({ icone, titulo, descricao, valor, onChange }) {
  return (
    <View className="flex-row items-center gap-4 px-4 py-4">
      <View className="w-10 h-10 items-center justify-center rounded-xl bg-primary-50">
        <Feather name={icone} size={19} color="#0F6B4F" />
      </View>
      <View className="flex-1">
        <Text className="font-manrope-semibold text-base text-ink">{titulo}</Text>
        {descricao ? (
          <Text className="font-manrope text-xs text-muted mt-0.5">{descricao}</Text>
        ) : null}
      </View>
      <Switch
        value={valor}
        onValueChange={onChange}
        trackColor={{ false: '#DCDFDA', true: '#0F6B4F' }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}