import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

const VERDE = '#0F6B4F';
const BRANCO = '#FFFFFF';
const DURACAO = 5000; // 5 segundos

export default function IntroScreen({ ready = true, onFinish }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const pulse = useRef(new Animated.Value(1)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(16)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  const [tempoTerminado, setTempoTerminado] = useState(false);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  // Animação de entrada + barra de progresso de 5s
  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, friction: 5, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(titleY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(subtitleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start(() => {
      // Pulsação suave do logo enquanto espera
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.06, duration: 700, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        ])
      ).start();
    });

    Animated.timing(progress, {
      toValue: 1,
      duration: DURACAO,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => setTempoTerminado(true), DURACAO);
    return () => clearTimeout(timer);
  }, []);

  // Sai quando passaram os 5s e a sessão já foi verificada
  useEffect(() => {
    if (!tempoTerminado || !ready) return;
    Animated.timing(screenOpacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => onFinishRef.current && onFinishRef.current());
  }, [tempoTerminado, ready]);

  const larguraBarra = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <StatusBar style="light" />

      <Animated.View
        style={[
          styles.logo,
          { opacity: logoOpacity, transform: [{ scale: Animated.multiply(logoScale, pulse) }] },
        ]}
      >
        <Feather name="log-in" size={40} color={VERDE} />
      </Animated.View>

      <Animated.Text
        style={[styles.title, { opacity: titleOpacity, transform: [{ translateY: titleY }] }]}
      >
        MeuAcesso
      </Animated.Text>

      <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
        Entradas e saídas, sempre consigo.
      </Animated.Text>

      <View style={styles.barraFundo}>
        <Animated.View style={[styles.barra, { width: larguraBarra }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VERDE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 84,
    height: 84,
    borderRadius: 22,
    backgroundColor: BRANCO,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 34,
    color: BRANCO,
  },
  subtitle: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 6,
  },
  barraFundo: {
    position: 'absolute',
    bottom: 64,
    width: 140,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  barra: {
    height: '100%',
    backgroundColor: BRANCO,
    borderRadius: 2,
  },
});