import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Botão verde principal, com seta e estado de carregamento.
export default function BotaoPrimario({ titulo, onPress, loading = false }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      className="h-14 flex-row items-center justify-center gap-2 rounded-2xl bg-primary active:bg-primary-700"
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <>
          <Text className="font-manrope-bold text-base text-white">{titulo}</Text>
          <Feather name="arrow-right" size={19} color="#FFFFFF" />
        </>
      )}
    </Pressable>
  );
}