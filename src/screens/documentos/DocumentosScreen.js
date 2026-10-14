import React from 'react';
import { ScrollView, View } from 'react-native';

import { AppHeader, TituloEcra } from '../../components/app';
import { CaixaAdicionar, CartaoFicheiro } from '../../components/documentos';
import { ficheirosDocumentos } from '../../data/mock';

export default function DocumentosScreen() {
  return (
    <View className="flex-1 bg-canvas">
      <AppHeader />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <TituloEcra
          titulo="Documentos"
          subtitulo="Envie o seu BI para que as instituições possam confirmar quem é."
        />

        {ficheirosDocumentos.map((f) => (
          <CartaoFicheiro key={f.id} ficheiro={f} />
        ))}

        {/* Sem funcionalidade por agora: os botões não fazem nada */}
        <CaixaAdicionar onTirarFoto={() => {}} onGaleria={() => {}} />
      </ScrollView>
    </View>
  );
}