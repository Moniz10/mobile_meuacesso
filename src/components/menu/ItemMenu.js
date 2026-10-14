import React from 'react';
import { Pressable, Text } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

// Uma linha do menu lateral. `perigo` pinta de vermelho (ex.: Terminar sessão).
export default function ItemMenu({ icone, lib = 'feather', rotulo, ativo = false, perigo = false, onPress }) {
  const Icone = lib === 'mci' ? MaterialCommunityIcons : Feather;
  const cor = perigo ? '#B42318' : ativo ? '#0F6B4F' : '#14231C';

  return (
    <Pressable
      onPress={onPress}
      className={`h-14 flex-row items-center gap-4 rounded-2xl px-4 ${
        ativo ? 'bg-primary-50' : 'active:bg-field'
      }`}
    >
      <Icone name={icone} size={21} color={cor} />
      <Text
        className={`text-base ${ativo || perigo ? 'font-manrope-bold' : 'font-manrope-medium'}`}
        style={{ color: cor }}
      >
        {rotulo}
      </Text>
    </Pressable>
  );
}