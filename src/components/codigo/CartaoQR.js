import React from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

// Cartão branco (borda 1px) com o QR e os 4 dígitos por baixo.
export default function CartaoQR({ codigo = '0000' }) {
  const digitos = String(codigo).padStart(4, '0').slice(0, 4).split('');

  return (
    <View className="items-center rounded-3xl border border-line bg-white px-6 pt-7 pb-6">
      {/* Moldura do QR com cantos verdes */}
      <View className="p-3">
        <View className="absolute top-0 left-0 w-7 h-7 border-t-4 border-l-4 border-primary rounded-tl-xl" />
        <View className="absolute top-0 right-0 w-7 h-7 border-t-4 border-r-4 border-primary rounded-tr-xl" />
        <View className="absolute bottom-0 left-0 w-7 h-7 border-b-4 border-l-4 border-primary rounded-bl-xl" />
        <View className="absolute bottom-0 right-0 w-7 h-7 border-b-4 border-r-4 border-primary rounded-br-xl" />
        <QRCode value={`MEUACESSO:${codigo}`} size={210} color="#14231C" backgroundColor="#FFFFFF" />
      </View>

      <View className="flex-row gap-2.5 mt-6 self-stretch">
        {digitos.map((d, i) => (
          <View key={i} className="flex-1 h-14 items-center justify-center rounded-xl bg-primary-50">
            <Text className="font-manrope-extrabold text-2xl leading-8 text-primary">{d}</Text>
          </View>
        ))}
      </View>

      <Text className="font-manrope-medium text-xs text-muted mt-4">
        Código pessoal · válido em todas as instituições
      </Text>
    </View>
  );
}