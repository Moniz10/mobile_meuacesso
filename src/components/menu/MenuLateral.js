import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import iniciais from '../../utils/iniciais';
import ItemMenu from './ItemMenu';

// Atalhos principais (nome da rota → ícone e texto).
const ITENS = [
  { rota: 'Inicio', icone: 'home', rotulo: 'Início' },
  { rota: 'Codigo', icone: 'qrcode', lib: 'mci', rotulo: 'O meu código e QR' },
  { rota: 'Documentos', icone: 'file-text', rotulo: 'Documentos' },
  { rota: 'Historico', icone: 'clock', rotulo: 'Histórico de visitas' },
];

const EXTRAS = [
  { rota: 'Suporte', icone: 'help-circle', rotulo: 'Suporte e feedback' },
  { rota: 'Definicoes', icone: 'settings', rotulo: 'Definições' },
];

// Menu que desliza da esquerda, com fundo escurecido.
export default function MenuLateral({ visivel, onFechar, rotaAtual, user, onNavegar, onSair }) {
  const insets = useSafeAreaInsets();
  const largura = Math.min(Dimensions.get('window').width * 0.82, 340);

  const x = useRef(new Animated.Value(-largura)).current;
  const fundo = useRef(new Animated.Value(0)).current;
  const [montado, setMontado] = useState(visivel);

  // Abre / fecha com animação
  useEffect(() => {
    if (visivel) {
      setMontado(true);
      Animated.parallel([
        Animated.timing(x, { toValue: 0, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(fundo, { toValue: 1, duration: 260, useNativeDriver: true }),
      ]).start();
    } else if (montado) {
      Animated.parallel([
        Animated.timing(x, { toValue: -largura, duration: 200, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
        Animated.timing(fundo, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start(() => setMontado(false));
    }
  }, [visivel]);

  if (!montado) return null;

  const nome = user?.name || 'Ana Machava';
  const codigo = user?.codigo || '48213';

  return (
    <Modal transparent visible statusBarTranslucent animationType="none" onRequestClose={onFechar}>
      {/* Fundo escuro: toca para fechar */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.fundo, { opacity: fundo }]}>
        <Pressable style={{ flex: 1 }} onPress={onFechar} />
      </Animated.View>

      {/* Painel */}
      <Animated.View style={[styles.painel, { width: largura, transform: [{ translateX: x }] }]}>
        {/* Cabeçalho verde com o utilizador */}
        <View className="bg-primary px-6 pb-6" style={{ paddingTop: insets.top + 24 }}>
          <View className="flex-row items-start justify-between">
            <View className="w-16 h-16 items-center justify-center rounded-full bg-[#F5C84C]">
              <Text className="font-manrope-extrabold text-xl text-ink">{iniciais(nome)}</Text>
            </View>
            <Pressable onPress={onFechar} hitSlop={10} className="w-10 h-10 items-center justify-center">
              <Feather name="x" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
          <Text className="font-manrope-extrabold text-xl text-white mt-4">{nome}</Text>
          <Text className="font-manrope-medium text-sm text-white/80 mt-0.5">Código {codigo}</Text>
        </View>

        {/* Atalhos */}
        <View className="flex-1 px-3 pt-4">
          {ITENS.map((item) => (
            <ItemMenu
              key={item.rota}
              {...item}
              ativo={rotaAtual === item.rota}
              onPress={() => onNavegar(item.rota)}
            />
          ))}

          <View className="h-px bg-line mx-4 my-3" />

          {EXTRAS.map((item) => (
            <ItemMenu
              key={item.rota}
              {...item}
              ativo={rotaAtual === item.rota}
              onPress={() => onNavegar(item.rota)}
            />
          ))}
        </View>

        {/* Rodapé */}
        <View className="border-t border-line px-3 pt-3" style={{ paddingBottom: insets.bottom + 12 }}>
          <ItemMenu icone="log-out" rotulo="Terminar sessão" perigo onPress={onSair} />
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fundo: { backgroundColor: 'rgba(12, 28, 22, 0.45)' },
  painel: { position: 'absolute', top: 0, bottom: 0, left: 0, backgroundColor: '#FFFFFF' },
});