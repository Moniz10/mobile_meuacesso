import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

// Cartão com borda de 1px de uma visita a uma instituição.
export default function CartaoVisita({ visita, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-4 rounded-2xl border border-line bg-white p-4 active:bg-field"
    >
      <View className="w-12 h-12 items-center justify-center rounded-xl bg-primary-50">
        <MaterialCommunityIcons name="office-building-outline" size={24} color="#0F6B4F" />
      </View>
      <View className="flex-1">
        <Text className="font-manrope-bold text-base text-ink">{visita.instituicao}</Text>
        <Text className="font-manrope-medium text-sm text-muted mt-0.5">
          {visita.quando} · {visita.inicio} – {visita.fim}
        </Text>
      </View>
      <Feather name="chevron-right" size={20} color="#9AA39F" />
    </Pressable>
  );
}