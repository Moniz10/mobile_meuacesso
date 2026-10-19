import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Caixa no topo do ecrã Documentos: diz em que ponto está o BI do utilizador.
const ESTADOS = {
  nao_submetido: {
    icone: 'upload-cloud',
    caixa: 'border-[#F3DFAE] bg-[#FDF4DD]',
    cor: '#8A6410',
    titulo: 'text-[#5C4310]',
    texto: 'text-[#5C4310]',
    rotulo: 'Ainda não submeteu o seu BI',
    mensagem:
      'Envie a frente e o verso do seu BI. Lemos os seus dados automaticamente e fica pronto para ser atendido com o seu código.',
  },
  submetido: {
    icone: 'check-circle',
    caixa: 'border-line bg-primary-50',
    cor: '#0F6B4F',
    titulo: 'text-primary',
    texto: 'text-ink',
    rotulo: 'BI submetido',
    mensagem:
      'Recebemos a frente e o verso do seu BI e os dados foram lidos. Estão em análise até uma instituição os confirmar.',
  },
  verificado: {
    icone: 'shield',
    caixa: 'border-line bg-primary-50',
    cor: '#0F6B4F',
    titulo: 'text-primary',
    texto: 'text-ink',
    rotulo: 'BI verificado',
    mensagem: 'O seu BI foi confirmado. Já pode usar o seu código em qualquer instituição.',
  },
};

export default function EstadoDocumentos({ estado }) {
  const e = ESTADOS[estado];
  if (!e) return null;

  return (
    <View className={`flex-row items-start gap-3 rounded-2xl border p-4 mb-5 ${e.caixa}`}>
      <Feather name={e.icone} size={20} color={e.cor} style={{ marginTop: 1 }} />
      <View className="flex-1">
        <Text className={`font-manrope-bold text-base ${e.titulo}`}>{e.rotulo}</Text>
        <Text className={`font-manrope-medium text-sm leading-5 mt-1 ${e.texto}`}>{e.mensagem}</Text>
      </View>
    </View>
  );
}
