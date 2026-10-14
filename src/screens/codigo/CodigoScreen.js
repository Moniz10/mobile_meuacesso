import React from 'react';
import { ScrollView, View } from 'react-native';

import { AppHeader, Aviso, TituloEcra } from '../../components/app';
import { CartaoQR } from '../../components/codigo';
import useAuth from '../../hooks/useAuth';

export default function CodigoScreen() {
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-canvas">
      <AppHeader />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <TituloEcra
          titulo="O meu código"
          subtitulo="Mostre o QR à recepção ou diga os 5 dígitos."
        />

        <CartaoQR codigo={user?.codigo || '48213'} />

        <View className="mt-5">
          <Aviso texto="A instituição só vê os dados que autorizou e fica com o registo desta visita." />
        </View>
      </ScrollView>
    </View>
  );
}