import React from 'react';
import { Pressable, Text, View } from 'react-native';

function saudacaoDoMomento() {
  const hora = new Date().getHours();
  if (hora < 12) return 'Bom dia,';
  if (hora < 19) return 'Boa tarde,';
  return 'Boa noite,';
}

function iniciais(nome = '') {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  const primeira = partes[0]?.[0] ?? '';
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return (primeira + ultima).toUpperCase() || 'MA';
}

// "Bom dia, Ana Machava" + avatar com as iniciais.
export default function Saudacao({ nome, onAvatar }) {
  return (
    <View className="flex-row items-center justify-between mt-6">
      <View className="flex-1 pr-3">
        <Text className="font-manrope-medium text-[15px] text-muted">{saudacaoDoMomento()}</Text>
        <Text className="font-manrope-extrabold text-[28px] leading-9 text-ink" numberOfLines={1}>
          {nome}
        </Text>
      </View>
      <Pressable
        onPress={onAvatar}
        className="w-14 h-14 items-center justify-center rounded-full bg-primary-50 border border-line active:opacity-80"
      >
        <Text className="font-manrope-extrabold text-base text-primary">{iniciais(nome)}</Text>
      </Pressable>
    </View>
  );
}