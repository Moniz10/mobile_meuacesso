import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Svg, { Circle, Path } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';

const VERDE = '#0F6B4F';
const VERDE_ESCURO = '#0C5A42';
const SOL = '#F5C84C';
const BRANCO = '#FFFFFF';
const DURACAO = 5000; // 5 segundos

// ---- Geometria do triângulo (caixa de 160 x 150) ----
const LARGURA = 160;
const ALTURA = 150;
const TOPO = { x: 80, y: 12 };
const DIREITA = { x: 152, y: 136 };
const ESQUERDA = { x: 8, y: 136 };
const CENTRO = { x: 80, y: (TOPO.y + DIREITA.y + ESQUERDA.y) / 3 }; // ≈ 94.7
const CAMINHO = `M${TOPO.x} ${TOPO.y} L${DIREITA.x} ${DIREITA.y} L${ESQUERDA.x} ${ESQUERDA.y} Z`;
const PERIMETRO = 432; // ≈ 143 + 144 + 143

// ---- Pin de localização (substitui o ponto) ----
const PIN = 30; // tamanho do ícone
const PONTA = { x: PIN / 2, y: (PIN * 23) / 24 }; // a ponta do pin é o que toca no caminho
const PIN_CAMINHO = 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'; // forma "map-pin" (viewBox 24)
const ONDA = 16; // diâmetro base do anel que se espalha no chão

const PathAnimado = Animated.createAnimatedComponent(Path);

export default function IntroScreen({ ready = true, onFinish }) {
  // Percurso do pin à volta do triângulo (0 → 1)
  const percurso = useRef(new Animated.Value(0)).current;
  // Pin a descer do topo para o centro (0 → 1)
  const paraCentro = useRef(new Animated.Value(0)).current;
  // Preenchimento suave do triângulo depois de fechado
  const preenchimento = useRef(new Animated.Value(0)).current;

  const figuraOpacity = useRef(new Animated.Value(0)).current;
  const onda = useRef(new Animated.Value(1)).current; // 1 = onda invisível
  const salto = useRef(new Animated.Value(0)).current; // o pin "respira" a subir e descer
  const entrada = useRef(new Animated.Value(0)).current; // etiqueta "Entrada" acende
  const saidaChip = useRef(new Animated.Value(0)).current; // etiqueta "Saída" acende
  const rodar = useRef(new Animated.Value(0)).current;
  const tituloOpacity = useRef(new Animated.Value(0)).current;
  const tituloY = useRef(new Animated.Value(18)).current;
  const subtituloOpacity = useRef(new Animated.Value(0)).current;
  const progresso = useRef(new Animated.Value(0)).current;
  const saida = useRef(new Animated.Value(0)).current;

  const [tempoTerminado, setTempoTerminado] = useState(false);
  const [aSair, setASair] = useState(false);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    // Triângulos do fundo a rodar devagar, sem parar
    Animated.loop(
      Animated.timing(rodar, { toValue: 1, duration: 18000, easing: Easing.linear, useNativeDriver: true })
    ).start();

    Animated.sequence([
      // 1) A figura aparece
      Animated.timing(figuraOpacity, { toValue: 1, duration: 300, useNativeDriver: false }),

      // 2) O pin percorre o triângulo e vai desenhando a linha atrás de si
      Animated.timing(percurso, {
        toValue: 1,
        duration: 2200,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: false,
      }),

      // 3) O triângulo fecha-se e o pin cai no centro: acesso concedido
      Animated.parallel([
        Animated.timing(preenchimento, { toValue: 1, duration: 500, useNativeDriver: false }),
        Animated.spring(paraCentro, { toValue: 1, friction: 6, tension: 60, useNativeDriver: false }),
      ]),

      // 4) Nome da app
      Animated.parallel([
        Animated.timing(tituloOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.timing(tituloY, { toValue: 0, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.timing(subtituloOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),

      // 5) Registo: primeiro a Entrada, depois a Saída (o coração da app)
      Animated.timing(entrada, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.timing(saidaChip, { toValue: 1, duration: 350, useNativeDriver: true }),
    ]).start(() => {
      // O pin "respira" e solta ondas enquanto a app termina de carregar
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(onda, { toValue: 0, duration: 0, useNativeDriver: true }),
            Animated.timing(onda, { toValue: 1, duration: 1400, easing: Easing.out(Easing.quad), useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(salto, { toValue: 1, duration: 700, easing: Easing.out(Easing.quad), useNativeDriver: true }),
            Animated.timing(salto, { toValue: 0, duration: 700, easing: Easing.in(Easing.quad), useNativeDriver: true }),
          ]),
        ])
      ).start();
    });

    Animated.timing(progresso, { toValue: 1, duration: DURACAO, easing: Easing.linear, useNativeDriver: false }).start();

    const timer = setTimeout(() => setTempoTerminado(true), DURACAO);
    return () => clearTimeout(timer);
  }, []);

  // Sai quando passaram os 5s (ou a pessoa tocou no ecrã) e a sessão já foi verificada
  useEffect(() => {
    if (!(tempoTerminado || aSair) || !ready) return;
    Animated.timing(saida, { toValue: 1, duration: 450, easing: Easing.in(Easing.cubic), useNativeDriver: true }).start(
      () => onFinishRef.current && onFinishRef.current()
    );
  }, [tempoTerminado, aSair, ready]);

  // ---- Posição do pin: a PONTA segue as 3 arestas e depois cai no centro ----
  const pinX = percurso.interpolate({
    inputRange: [0, 1 / 3, 2 / 3, 1],
    outputRange: [TOPO.x, DIREITA.x, ESQUERDA.x, TOPO.x].map((v) => v - PONTA.x),
  });
  const pinYAresta = percurso.interpolate({
    inputRange: [0, 1 / 3, 2 / 3, 1],
    outputRange: [TOPO.y, DIREITA.y, ESQUERDA.y, TOPO.y].map((v) => v - PONTA.y),
  });
  const pinY = Animated.add(pinYAresta, paraCentro.interpolate({ inputRange: [0, 1], outputRange: [0, CENTRO.y - TOPO.y] }));

  // A linha vai-se desenhando atrás do pin
  const linhaOffset = percurso.interpolate({ inputRange: [0, 1], outputRange: [PERIMETRO, 0] });
  const linhaFill = preenchimento.interpolate({ inputRange: [0, 1], outputRange: [0, 0.14] });

  // Cada vértice acende quando o pin lá chega
  const acender = (limite) =>
    percurso.interpolate({ inputRange: [Math.max(limite - 0.06, 0), limite], outputRange: [0.25, 1], extrapolate: 'clamp' });

  const ondaEscala = onda.interpolate({ inputRange: [0, 1], outputRange: [1, 3.6] });
  const ondaEscalaY = onda.interpolate({ inputRange: [0, 1], outputRange: [0.45, 1.6] }); // anel achatado, como no chão
  const pinSobe = salto.interpolate({ inputRange: [0, 1], outputRange: [0, -5] });
  const ondaOpacity = onda.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0] });
  const rotacao = rodar.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const rotacaoInversa = rodar.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-360deg'] });
  const larguraBarra = progresso.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  const saidaOpacity = saida.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  const saidaEscala = saida.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });

  const vertices = [
    { ...DIREITA, limite: 1 / 3 },
    { ...ESQUERDA, limite: 2 / 3 },
    { ...TOPO, limite: 1 },
  ];

  return (
    <Pressable style={styles.ecra} onPress={() => setASair(true)} accessibilityLabel="Toque para entrar">
      <StatusBar style="light" />

      <Animated.View style={[styles.container, { opacity: saidaOpacity, transform: [{ scale: saidaEscala }] }]}>
        {/* Fundo: dois triângulos grandes e transparentes a rodar */}
        <Animated.View style={[styles.fundoTriangulo, { transform: [{ rotate: rotacao }] }]} pointerEvents="none">
          <Svg width={520} height={520} viewBox="0 0 160 150">
            <Path d={CAMINHO} stroke="rgba(255,255,255,0.05)" strokeWidth={1} fill="none" strokeLinejoin="round" />
          </Svg>
        </Animated.View>
        <Animated.View style={[styles.fundoTriangulo, { transform: [{ rotate: rotacaoInversa }] }]} pointerEvents="none">
          <Svg width={360} height={360} viewBox="0 0 160 150">
            <Path d={CAMINHO} stroke="rgba(245,200,76,0.08)" strokeWidth={1.2} fill="none" strokeLinejoin="round" />
          </Svg>
        </Animated.View>

        {/* Figura principal */}
        <Animated.View style={[styles.figura, { opacity: figuraOpacity }]}>
          <Svg width={LARGURA} height={ALTURA} style={StyleSheet.absoluteFill}>
            {/* Trilho apagado */}
            <Path d={CAMINHO} stroke="rgba(255,255,255,0.14)" strokeWidth={3} fill="none" strokeLinejoin="round" />
            {/* Linha desenhada pelo pin */}
            <PathAnimado
              d={CAMINHO}
              stroke={BRANCO}
              strokeWidth={3.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray={`${PERIMETRO} ${PERIMETRO}`}
              strokeDashoffset={linhaOffset}
              fill={BRANCO}
              fillOpacity={linhaFill}
            />
          </Svg>

          {/* Vértices */}
          {vertices.map((v) => (
            <Animated.View
              key={`${v.x}-${v.y}`}
              style={[styles.vertice, { left: v.x - 5, top: v.y - 5, opacity: acender(v.limite) }]}
            />
          ))}

          {/* Sombra no chão, por baixo da ponta do pin */}
          <Animated.View
            pointerEvents="none"
            style={[styles.sombra, { left: CENTRO.x - 8, top: CENTRO.y - 2.5, opacity: paraCentro }]}
          />

          {/* Anel que se espalha no chão: o "perímetro" a ser controlado */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.onda,
              {
                left: CENTRO.x - ONDA / 2,
                top: CENTRO.y - ONDA / 2,
                opacity: ondaOpacity,
                transform: [{ scaleX: ondaEscala }, { scaleY: ondaEscalaY }],
              },
            ]}
          />

          {/* O pin de localização: a ponta toca no caminho */}
          <Animated.View style={[styles.pinCaixa, { transform: [{ translateX: pinX }, { translateY: pinY }] }]}>
            <Animated.View style={{ transform: [{ translateY: pinSobe }] }}>
              <Svg width={PIN} height={PIN} viewBox="0 0 24 24">
                <Path d={PIN_CAMINHO} fill={SOL} stroke={BRANCO} strokeWidth={1.8} strokeLinejoin="round" />
                <Circle cx={12} cy={10} r={3} fill={VERDE} />
              </Svg>
            </Animated.View>
          </Animated.View>
        </Animated.View>

        <Animated.Text style={[styles.titulo, { opacity: tituloOpacity, transform: [{ translateY: tituloY }] }]}>
          Meu<Text style={styles.tituloDestaque}>Acesso</Text>
        </Animated.Text>

        <Animated.Text style={[styles.subtitulo, { opacity: subtituloOpacity }]}>
          Entradas e saídas, sempre consigo.
        </Animated.Text>

        {/* Entrada → Saída: acendem uma a seguir à outra */}
        <View style={styles.registo}>
          <Etiqueta icone="log-in" texto="Entrada" aceso={entrada} />
          <Feather name="arrow-right" size={14} color="rgba(255,255,255,0.45)" />
          <Etiqueta icone="log-out" texto="Saída" aceso={saidaChip} />
        </View>

        <View style={styles.barraFundo}>
          <Animated.View style={[styles.barra, { width: larguraBarra }]} />
        </View>
      </Animated.View>
    </Pressable>
  );
}

// Etiqueta redonda que "acende" (contorno amarelo e visto) quando o valor passa de 0 para 1
function Etiqueta({ icone, texto, aceso }) {
  return (
    <View style={styles.chip}>
      <Animated.View style={[StyleSheet.absoluteFill, styles.chipAceso, { opacity: aceso }]} />
      <Feather name={icone} size={14} color={BRANCO} />
      <Text style={styles.chipTexto}>{texto}</Text>
      <Animated.View style={{ opacity: aceso }}>
        <Feather name="check" size={14} color={SOL} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  ecra: {
    flex: 1,
    backgroundColor: VERDE,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: VERDE,
  },
  fundoTriangulo: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  figura: {
    width: LARGURA,
    height: ALTURA,
    marginBottom: 34,
  },
  vertice: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BRANCO,
    borderWidth: 2,
    borderColor: VERDE_ESCURO,
  },
  pinCaixa: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: PIN,
    height: PIN,
  },
  sombra: {
    position: 'absolute',
    width: 16,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  onda: {
    position: 'absolute',
    width: ONDA,
    height: ONDA,
    borderRadius: ONDA / 2,
    borderWidth: 2,
    borderColor: SOL,
  },
  registo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 22,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },
  chipAceso: {
    backgroundColor: VERDE_ESCURO,
    borderColor: SOL,
    borderWidth: 1.5,
    borderRadius: 17,
  },
  chipTexto: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 13,
    color: BRANCO,
  },
  titulo: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 36,
    color: BRANCO,
    letterSpacing: -0.5,
  },
  tituloDestaque: {
    color: SOL,
  },
  subtitulo: {
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
    backgroundColor: SOL,
    borderRadius: 2,
  },
});