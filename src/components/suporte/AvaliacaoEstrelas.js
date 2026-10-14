import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ROTULOS = ['', 'Muito mau', 'Mau', 'Razoável', 'Bom', 'Excelente'];

// 5 estrelas tocáveis + texto "4 de 5 · Bom".
export default function AvaliacaoEstrelas({ valor, onChange }) {
  return (
    <View>
      <View className="flex-row gap-3">
        {[1, 2, 3, 4, 5].map((n) => {
          const cheia = n <= valor;
          return (
            <Pressable key={n} onPress={() => onChange(n)} hitSlop={6} className="active:scale-90">
              <MaterialCommunityIcons
                name={cheia ? 'star' : 'star-outline'}
                size={40}
                color={cheia ? '#F5B921' : '#9AA39F'}
              />
            </Pressable>
          );
        })}
      </View>
      <Text className="font-manrope-bold text-sm text-primary mt-3">
        {valor > 0 ? `${valor} de 5 · ${ROTULOS[valor]}` : 'Toque nas estrelas para avaliar'}
      </Text>
    </View>
  );
}