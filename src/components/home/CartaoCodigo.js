import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Cartão verde com o código único de 5 dígitos e o botão do QR.
export default function CartaoCodigo({ codigo = '00000', onMostrarQR }) {
  const digitos = String(codigo).padStart(5, '0').slice(0, 5).split('');

  return (
    <View className="mt-6 overflow-hidden rounded-3xl bg-primary p-5">
      {/* Círculos decorativos */}
      <View className="absolute -top-16 -right-12 w-44 h-44 rounded-full bg-white/5" />
      <View className="absolute -bottom-20 -left-10 w-40 h-40 rounded-full bg-white/5" />

      <Text className="font-manrope-bold text-xs text-white/80 uppercase tracking-widest">
        O meu código único
      </Text>

      <View className="flex-row gap-2.5 mt-4">
        {digitos.map((d, i) => (
          <View key={i} className="flex-1 h-16 items-center justify-center rounded-2xl bg-white">
            <Text className="font-manrope-extrabold text-3xl leading-10 text-ink">{d}</Text>
          </View>
        ))}
      </View>

      <Pressable
        onPress={onMostrarQR}
        className="mt-4 h-14 flex-row items-center justify-center gap-2 rounded-2xl bg-[#F5C84C] active:opacity-90"
      >
        <MaterialCommunityIcons name="qrcode" size={22} color="#14231C" />
        <Text className="font-manrope-bold text-base text-ink">Mostrar QR code</Text>
      </Pressable>
    </View>
  );
}