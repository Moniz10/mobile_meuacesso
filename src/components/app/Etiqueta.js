import React from 'react';
import { Text, View } from 'react-native';

// Etiqueta de estado: verificado / em análise / em falta / submetido / não submetido.
const ESTILOS = {
  verificado: { caixa: 'bg-primary-50', texto: 'text-primary', rotulo: 'Verificado' },
  analise: { caixa: 'bg-[#FCEFD5]', texto: 'text-[#9A6B12]', rotulo: 'Em análise' },
  falta: { caixa: 'bg-field border border-line', texto: 'text-muted', rotulo: 'Em falta' },
  submetido: { caixa: 'bg-primary-50', texto: 'text-primary', rotulo: 'Submetido' },
  nao_submetido: { caixa: 'bg-[#FCEFD5]', texto: 'text-[#9A6B12]', rotulo: 'Não submetido' },
};

export default function Etiqueta({ estado = 'verificado' }) {
  const e = ESTILOS[estado] ?? ESTILOS.verificado;
  return (
    <View className={`px-3 py-1.5 rounded-full ${e.caixa}`}>
      <Text className={`font-manrope-bold text-xs ${e.texto}`}>{e.rotulo}</Text>
    </View>
  );
}