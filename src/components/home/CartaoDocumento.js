import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { Etiqueta } from '../app';

// Cartão com borda de 1px de um documento e o seu estado.
export default function CartaoDocumento({ documento, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 rounded-2xl border border-line bg-white p-4 mb-3 active:bg-field"
    >
      <View className="flex-1">
        <Text className="font-manrope-bold text-base text-ink">{documento.titulo}</Text>
        <Text className="font-manrope-medium text-sm text-muted mt-0.5">{documento.descricao}</Text>
      </View>
      <Etiqueta estado={documento.estado} />
    </Pressable>
  );
}