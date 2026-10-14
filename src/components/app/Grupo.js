import React from 'react';
import { Text, View } from 'react-native';

// Cartão (borda 1px) com título por cima e linhas separadas por traço fino.
export default function Grupo({ titulo, children }) {
  const linhas = React.Children.toArray(children).filter(Boolean);

  return (
    <View className="mt-6">
      {titulo ? (
        <Text className="font-manrope-bold text-xs text-muted uppercase tracking-widest mb-3 ml-1">
          {titulo}
        </Text>
      ) : null}
      <View className="rounded-2xl border border-line bg-white overflow-hidden">
        {linhas.map((linha, i) => (
          <View key={i} className={i > 0 ? 'border-t border-line' : ''}>
            {linha}
          </View>
        ))}
      </View>
    </View>
  );
}