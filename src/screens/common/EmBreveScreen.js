import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { AppHeader } from '../../components/app';

// Ecrã temporário para os separadores que ainda vamos fazer.
export default function EmBreveScreen({ route }) {
  return (
    <View className="flex-1 bg-canvas">
      <AppHeader />
      <View className="flex-1 items-center justify-center px-8">
        <View className="w-16 h-16 items-center justify-center rounded-2xl border border-line bg-white">
          <Feather name="tool" size={26} color="#0F6B4F" />
        </View>
        <Text className="font-manrope-extrabold text-2xl text-ink mt-5">
          {route.params?.titulo ?? route.name}
        </Text>
        <Text className="font-manrope text-[15px] text-muted text-center mt-2">
          Este ecrã está a ser preparado.
        </Text>
      </View>
    </View>
  );
}