import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Folha que sobe do fundo: de onde vem o ficheiro? (câmara, galeria ou ficheiros)
export default function EscolherOrigem({ visivel, titulo, aviso, aceitaPdf = true, aoFechar, aoEscolher }) {
  const opcoes = [
    { id: 'camera', icone: 'camera', rotulo: 'Tirar foto', ajuda: 'Abre a câmara agora' },
    { id: 'galeria', icone: 'image', rotulo: 'Galeria', ajuda: 'Escolher uma foto já guardada' },
    {
      id: 'ficheiros',
      icone: 'folder',
      rotulo: 'Ficheiros',
      ajuda: aceitaPdf ? 'Gestor de documentos (foto ou PDF)' : 'Gestor de documentos (só fotos)',
    },
  ];

  return (
    <Modal visible={visivel} transparent animationType="slide" onRequestClose={aoFechar}>
      <Pressable className="flex-1 bg-black/50" onPress={aoFechar} />

      <View className="bg-white rounded-t-3xl px-5 pt-3 pb-8">
        <View className="self-center w-10 h-1.5 rounded-full bg-line mb-4" />
        <Text className="font-manrope-extrabold text-lg text-ink">{titulo}</Text>
        <Text className="font-manrope text-sm text-muted mt-1 mb-4">Escolha de onde vem o ficheiro.</Text>

        {aviso ? (
          <View className="flex-row gap-3 rounded-2xl bg-primary-50 p-4 mb-4">
            <Feather name="info" size={18} color="#0F6B4F" />
            <Text className="flex-1 font-manrope-medium text-sm text-ink">{aviso}</Text>
          </View>
        ) : null}

        {opcoes.map((o) => (
          <Pressable
            key={o.id}
            onPress={() => aoEscolher(o.id)}
            className="flex-row items-center gap-4 rounded-2xl border border-line p-4 mb-3 active:bg-field"
          >
            <View className="w-12 h-12 items-center justify-center rounded-xl bg-primary-50">
              <Feather name={o.icone} size={21} color="#0F6B4F" />
            </View>
            <View className="flex-1">
              <Text className="font-manrope-bold text-base text-ink">{o.rotulo}</Text>
              <Text className="font-manrope text-sm text-muted mt-0.5">{o.ajuda}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#5F6B66" />
          </Pressable>
        ))}

        <Pressable onPress={aoFechar} className="h-12 items-center justify-center rounded-xl active:bg-field">
          <Text className="font-manrope-bold text-sm text-muted">Cancelar</Text>
        </Pressable>
      </View>
    </Modal>
  );
}