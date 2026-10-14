import React from 'react';
import { Text, View } from 'react-native';

// Linha fina com texto ao meio (ex.: "ou").
export default function Divisor({ texto = 'ou' }) {
  return (
    <View className="flex-row items-center my-5">
      <View className="flex-1 h-px bg-line" />
      <Text className="font-manrope-medium text-xs text-muted mx-3 uppercase tracking-widest">
        {texto}
      </Text>
      <View className="flex-1 h-px bg-line" />
    </View>
  );
}