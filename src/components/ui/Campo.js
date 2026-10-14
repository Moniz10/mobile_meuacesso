import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Campo de texto com etiqueta, ícone à esquerda e borda verde ao focar.
// Com `senha`, mostra o botão do olho para mostrar/esconder.
export default function Campo({ label, icon, senha = false, ...inputProps }) {
  const [focado, setFocado] = useState(false);
  const [visivel, setVisivel] = useState(false);

  return (
    <View className="mb-4">
      <Text className="font-manrope-semibold text-sm text-ink mb-2">{label}</Text>
      <View
        className={`h-14 flex-row items-center gap-3 rounded-2xl border px-4 ${
          focado ? 'border-primary bg-primary-50' : 'border-line bg-field'
        }`}
      >
        <Feather name={icon} size={19} color={focado ? '#0F6B4F' : '#9AA39F'} />
        <TextInput
          className="flex-1 h-full font-manrope-medium text-base text-ink"
          placeholderTextColor="#9AA39F"
          secureTextEntry={senha && !visivel}
          autoCapitalize={senha ? 'none' : inputProps.autoCapitalize}
          onFocus={() => setFocado(true)}
          onBlur={() => setFocado(false)}
          {...inputProps}
        />
        {senha && (
          <Pressable onPress={() => setVisivel((v) => !v)} hitSlop={10}>
            <Feather name={visivel ? 'eye-off' : 'eye'} size={19} color="#5F6B66" />
          </Pressable>
        )}
      </View>
    </View>
  );
}