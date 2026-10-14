import React from 'react';
import { Text, View } from 'react-native';

import iniciais from '../../utils/iniciais';

// Cartão (borda 1px) de uma visita: instituição, motivo, horas e quem atendeu.
export default function CartaoHistorico({ visita }) {
  const { instituicao, motivo, inicio, fim, atendente } = visita;

  return (
    <View className="rounded-2xl border border-line bg-white mb-3">
      {/* Parte de cima: instituição + horas */}
      <View className="flex-row items-start gap-3 p-4">
        <View className="flex-1">
          <Text className="font-manrope-bold text-base text-ink">{instituicao}</Text>
          <Text className="font-manrope-medium text-sm text-muted mt-0.5">Motivo: {motivo}</Text>
        </View>
        <View className="px-3 py-1.5 rounded-full bg-primary-50">
          <Text className="font-manrope-bold text-xs text-primary">
            {inicio} – {fim}
          </Text>
        </View>
      </View>

      {/* Parte de baixo: quem atendeu */}
      <View className="flex-row items-center gap-3 px-4 py-3 border-t border-line">
        <View className="w-10 h-10 items-center justify-center rounded-full bg-field border border-line">
          <Text className="font-manrope-bold text-xs text-muted">{iniciais(atendente.nome)}</Text>
        </View>
        <View className="flex-1">
          <Text className="font-manrope-semibold text-sm text-ink">{atendente.nome}</Text>
          <Text className="font-manrope text-xs text-muted mt-0.5">{atendente.area}</Text>
        </View>
      </View>
    </View>
  );
}