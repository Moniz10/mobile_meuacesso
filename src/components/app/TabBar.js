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

// Barra de separadores do fundo, desenhada à medida.
export default function TabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row bg-white border-t border-line px-2 pt-2"
      style={{ paddingBottom: Math.max(insets.bottom, 10) }}
    >
      {state.routes.map((route, index) => {
        const ativo = state.index === index;
        const { options } = descriptors[route.key];
        const titulo = options.title ?? route.name;
        const icone = ICONES[route.name] ?? { lib: Feather, nome: 'circle' };
        const Icone = icone.lib;
        const cor = ativo ? '#0F6B4F' : '#5F6B66';

        const abrir = () => {
          const evento = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!ativo && !evento.defaultPrevented) navigation.navigate(route.name);
        };

        return (
          <Pressable key={route.key} onPress={abrir} className="flex-1 items-center py-1">
            <View
              className={`w-14 h-8 items-center justify-center rounded-full ${
                ativo ? 'bg-primary-50' : ''
              }`}
            >
              <Icone name={icone.nome} size={21} color={cor} />
            </View>
            <Text
              className={`mt-1 text-xs ${
                ativo ? 'font-manrope-bold text-primary' : 'font-manrope-medium text-muted'
              }`}
            >
              {titulo}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}