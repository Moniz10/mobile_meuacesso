import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

// Ícone de cada separador (nome da rota → ícone).
const ICONES = {
  Inicio: { lib: Feather, nome: 'home' },
  Codigo: { lib: MaterialCommunityIcons, nome: 'qrcode' },
  Documentos: { lib: Feather, nome: 'file-text' },
  Historico: { lib: Feather, nome: 'clock' },
};

// Barra do fundo moderna: uma "pílula" flutuante, tudo redondo.
// O separador activo vira uma pílula verde com ícone + nome; os outros são só círculos.
export default function TabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-canvas px-4 pt-2" style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
      <View
        className="flex-row items-center justify-between rounded-full bg-white p-2"
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 6 },
          elevation: 10,
        }}
      >
        {state.routes.map((route, index) => {
          const ativo = state.index === index;
          const { options } = descriptors[route.key];
          const titulo = options.title ?? route.name;
          const icone = ICONES[route.name] ?? { lib: Feather, nome: 'circle' };
          const Icone = icone.lib;

          const abrir = () => {
            const evento = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!ativo && !evento.defaultPrevented) navigation.navigate(route.name);
          };

          return (
            <Pressable
              key={route.key}
              onPress={abrir}
              android_ripple={null}
              className={`h-12 flex-row items-center justify-center rounded-full ${
                ativo ? 'bg-primary px-5 gap-2' : 'w-12 active:bg-field'
              }`}
            >
              <Icone name={icone.nome} size={21} color={ativo ? '#FFFFFF' : '#5F6B66'} />
              {ativo ? <Text className="font-manrope-bold text-sm text-white">{titulo}</Text> : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
