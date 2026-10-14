import React from 'react';
import { Pressable, Text, View } from 'react-native';

// Rodapé do cartão: "Ainda não tem conta? Criar conta".
export default function LinkRodape({ texto, link, onPress }) {
  return (
    <View className="flex-row justify-center items-center mt-7 pt-5 border-t border-line">
      <Text className="font-manrope-medium text-[15px] text-muted">{texto} </Text>
      <Pressable onPress={onPress} hitSlop={8}>
        <Text className="font-manrope-extrabold text-[15px] text-primary">{link}</Text>
      </Pressable>
    </View>
  );
}