import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import useTopoSeguro from '../../hooks/useTopoSeguro';

// Barra do topo com botão voltar e título (para ecrãs fora dos separadores).
export default function BarraVoltar({ titulo }) {
  const topo = useTopoSeguro();
  const navigation = useNavigation();

  return (
    <View className="bg-white border-b border-line" style={{ paddingTop: topo }}>
      <View className="h-16 flex-row items-center justify-between px-4">
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={6}
          className="w-11 h-11 items-center justify-center rounded-xl border border-line bg-canvas active:bg-field"
        >
          <Feather name="chevron-left" size={22} color="#14231C" />
        </Pressable>
        <Text className="font-manrope-extrabold text-lg text-ink">{titulo}</Text>
        <View className="w-11" />
      </View>
    </View>
  );
}