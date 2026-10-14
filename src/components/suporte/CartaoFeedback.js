import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { BotaoPrimario } from '../ui';
import AvaliacaoEstrelas from './AvaliacaoEstrelas';

// Cartão (borda 1px) com estrelas, comentário e botão de envio.
// Sem envio real: ao clicar mostra só uma mensagem de agradecimento.
export default function CartaoFeedback() {
  const [estrelas, setEstrelas] = useState(0);
  const [comentario, setComentario] = useState('');
  const [focado, setFocado] = useState(false);
  const [enviado, setEnviado] = useState(false);

  if (enviado) {
    return (
      <View className="items-center rounded-3xl border border-line bg-white px-6 py-8">
        <View className="w-14 h-14 items-center justify-center rounded-full bg-primary-50">
          <Feather name="check" size={26} color="#0F6B4F" />
        </View>
        <Text className="font-manrope-extrabold text-xl text-ink mt-4">Obrigado!</Text>
        <Text className="font-manrope text-[15px] text-muted text-center mt-1">
          A sua opinião ajuda-nos a melhorar o MeuAcesso.
        </Text>
      </View>
    );
  }

  return (
    <View className="rounded-3xl border border-line bg-white p-5">
      <Text className="font-manrope-bold text-base text-ink mb-4">
        Como está a ser a sua experiência?
      </Text>

      <AvaliacaoEstrelas valor={estrelas} onChange={setEstrelas} />

      <Text className="font-manrope-semibold text-sm text-ink mt-5 mb-2">
        Conte-nos mais (opcional)
      </Text>
      <TextInput
        value={comentario}
        onChangeText={setComentario}
        placeholder="O que correu bem? O que podemos melhorar?"
        placeholderTextColor="#9AA39F"
        multiline
        textAlignVertical="top"
        onFocus={() => setFocado(true)}
        onBlur={() => setFocado(false)}
        className={`min-h-[110px] rounded-2xl border px-4 py-3 font-manrope-medium text-base text-ink ${
          focado ? 'border-primary bg-primary-50' : 'border-line bg-field'
        }`}
      />

      <View className="mt-5">
        <BotaoPrimario titulo="Enviar feedback" onPress={() => setEnviado(true)} />
      </View>
    </View>
  );
}