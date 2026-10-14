import React from 'react';
import { Pressable, Text, View } from 'react-native';

// Título de secção com link opcional à direita (ex.: "Ver tudo").
export default function TituloSecao({ titulo, link, onPress }) {
  return (
    <View className="flex-row items-center justify-between mt-7 mb-3">
      <Text className="font-manrope-bold text-lg text-ink">{titulo}</Text>
      {link ? (
        <Pressable onPress={onPress} hitSlop={8}>
          <Text className="font-manrope-semibold text-sm text-primary">{link}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}