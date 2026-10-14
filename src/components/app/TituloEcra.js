import React from 'react';
import { Text, View } from 'react-native';

// Título grande + subtítulo no topo de cada separador.
export default function TituloEcra({ titulo, subtitulo }) {
  return (
    <View className="mt-6 mb-5">
      <Text className="font-manrope-extrabold text-[28px] leading-9 text-ink">{titulo}</Text>
      {subtitulo ? (
        <Text className="font-manrope text-[15px] leading-6 text-muted mt-1">{subtitulo}</Text>
      ) : null}
    </View>
  );
}