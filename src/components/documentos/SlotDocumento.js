import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

function formatarTamanho(bytes) {
  if (!bytes) return '';
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

// Um espaço para um documento: vazio (cartão com linha contínua) ou com pré-visualização.
// circular = true mostra a pré-visualização redonda (fotografia da pessoa).
export default function SlotDocumento({ titulo, descricao, icone, ficheiro, circular = false, onEscolher, onRemover }) {
  if (!ficheiro) {
    return (
      <Pressable
        onPress={onEscolher}
        className="flex-row items-center gap-4 rounded-2xl border border-line bg-white p-4 mb-3 active:bg-field"
      >
        <View className="w-14 h-14 items-center justify-center rounded-xl bg-field border border-line">
          <Feather name={icone} size={22} color="#5F6B66" />
        </View>
        <View className="flex-1">
          <Text className="font-manrope-bold text-base text-ink">{titulo}</Text>
          <Text className="font-manrope-medium text-sm text-muted mt-0.5">{descricao}</Text>
        </View>
        <View className="w-10 h-10 items-center justify-center rounded-full bg-primary">
          <Feather name="plus" size={20} color="#FFFFFF" />
        </View>
      </Pressable>
    );
  }

  const ePdf = ficheiro.mime === 'application/pdf';

  return (
    <View className="rounded-2xl border border-line bg-white p-4 mb-3">
      <View className="flex-row items-center gap-4">
        {ePdf ? (
          <View className="w-16 h-16 items-center justify-center rounded-xl bg-primary-50">
            <Feather name="file-text" size={26} color="#0F6B4F" />
          </View>
        ) : (
          <Image
            source={{ uri: ficheiro.uri }}
            resizeMode="cover"
            className={`w-16 h-16 bg-field ${circular ? 'rounded-full' : 'rounded-xl'}`}
          />
        )}

        <View className="flex-1">
          <Text className="font-manrope-bold text-base text-ink">{titulo}</Text>
          <Text numberOfLines={1} className="font-manrope-medium text-sm text-muted mt-0.5">
            {ficheiro.nome}
          </Text>
          <View className="flex-row items-center gap-1.5 mt-1.5">
            <Feather name="check-circle" size={14} color="#0F6B4F" />
            <Text className="font-manrope-bold text-xs text-primary">
              Pronto a enviar{ficheiro.tamanho ? ` · ${formatarTamanho(ficheiro.tamanho)}` : ''}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row gap-3 mt-4">
        <Pressable
          onPress={onEscolher}
          className="flex-1 h-11 flex-row items-center justify-center gap-2 rounded-xl border border-primary bg-white active:bg-primary-50"
        >
          <Feather name="refresh-cw" size={15} color="#0F6B4F" />
          <Text className="font-manrope-bold text-sm text-primary">Substituir</Text>
        </Pressable>
        <Pressable
          onPress={onRemover}
          className="flex-1 h-11 flex-row items-center justify-center gap-2 rounded-xl border border-line bg-white active:bg-[#FEF3F2]"
        >
          <Feather name="trash-2" size={15} color="#B42318" />
          <Text className="font-manrope-bold text-sm text-[#B42318]">Remover</Text>
        </Pressable>
      </View>
    </View>
  );
}