import React from 'react';
import { Text, View } from 'react-native';

// Título e subtítulo dentro do cartão.
export default function Cabecalho({ titulo, subtitulo }) {
  return (
    <View className="mb-7">
      <Text className="font-manrope-extrabold text-3xl text-ink">{titulo}</Text>
      {subtitulo ? (
        <Text className="font-manrope text-[15px] leading-6 text-muted mt-1">{subtitulo}</Text>
      ) : null}
    </View>
  );
}