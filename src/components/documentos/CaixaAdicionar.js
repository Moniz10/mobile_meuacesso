import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Caixa tracejada "Adicionar documento" com os botões Tirar foto e Da galeria.
export default function CaixaAdicionar({ onTirarFoto, onGaleria }) {
  return (
    <View className="mt-2 items-center rounded-3xl border-2 border-dashed border-line bg-white/60 px-5 py-6">
      <View className="w-14 h-14 items-center justify-center rounded-2xl bg-primary-50">
        <Feather name="upload" size={24} color="#0F6B4F" />
      </View>
      <Text className="font-manrope-bold text-base text-ink mt-3">Adicionar documento</Text>
      <Text className="font-manrope text-sm text-muted mt-1 text-center">
        Fotografe o documento numa superfície plana e com boa luz.
      </Text>

      <View className="flex-row gap-3 mt-5 self-stretch">
        <Pressable
          onPress={onTirarFoto}
          className="flex-1 h-12 flex-row items-center justify-center gap-2 rounded-xl bg-primary active:bg-primary-700"
        >
          <Feather name="camera" size={17} color="#FFFFFF" />
          <Text className="font-manrope-bold text-sm text-white">Tirar foto</Text>
        </Pressable>

        <Pressable
          onPress={onGaleria}
          className="flex-1 h-12 flex-row items-center justify-center gap-2 rounded-xl border border-primary bg-white active:bg-primary-50"
        >
          <Feather name="image" size={17} color="#0F6B4F" />
          <Text className="font-manrope-bold text-sm text-primary">Da galeria</Text>
        </Pressable>
      </View>
    </View>
  );
}