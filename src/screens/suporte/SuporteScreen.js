import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { AppHeader, TituloEcra, TituloSecao } from '../../components/app';
import { CartaoFeedback, ItemAjuda } from '../../components/suporte';

const AJUDA = [
  { id: 'faq', icone: 'help-circle', titulo: 'Perguntas frequentes' },
  { id: 'chat', icone: 'message-circle', titulo: 'Falar com o suporte' },
  { id: 'problema', icone: 'alert-triangle', titulo: 'Reportar um problema' },
];

export default function SuporteScreen() {
  return (
    <View className="flex-1 bg-canvas">
      <AppHeader />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TituloEcra
            titulo="Suporte e feedback"
            subtitulo="Diga-nos o que acha da app ou peça ajuda."
          />

          <CartaoFeedback />

          <TituloSecao titulo="Precisa de ajuda?" />
          {/* Sem funcionalidade por agora */}
          {AJUDA.map((item) => (
            <ItemAjuda key={item.id} icone={item.icone} titulo={item.titulo} onPress={() => {}} />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}