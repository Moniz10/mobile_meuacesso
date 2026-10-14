import React from 'react';
import { Text } from 'react-native';

// Separador de dia: "ONTEM · 13 OUT".
export default function TituloDia({ texto }) {
  return (
    <Text className="font-manrope-bold text-xs text-muted uppercase tracking-widest mt-6 mb-3">
      {texto}
    </Text>
  );
}