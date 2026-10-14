import React from 'react';
import { Pressable, ScrollView, Text } from 'react-native';

// Linha de filtros em forma de "pílula". O ativo fica verde.
export default function FiltroChips({ opcoes, valor, onChange }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingBottom: 4 }}
    >
      {opcoes.map((op) => {
        const ativo = op.valor === valor;
        return (
          <Pressable
            key={op.valor}
            onPress={() => onChange(op.valor)}
            className={`h-11 px-5 items-center justify-center rounded-full border ${
              ativo ? 'bg-primary border-primary' : 'bg-white border-line active:bg-field'
            }`}
          >
            <Text
              className={`text-sm ${
                ativo ? 'font-manrope-bold text-white' : 'font-manrope-semibold text-ink'
              }`}
            >
              {op.rotulo}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}