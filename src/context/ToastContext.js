import React, { createContext, useCallback, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ToastContext = createContext(null);

// Aviso bonito que desce do topo e some sozinho.
// Uso: const { mostrarToast } = useToast(); mostrarToast('Boas-vindas, Ana!', 'Que bom ver você.');
export function ToastProvider({ children }) {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState(null);
  const y = useRef(new Animated.Value(-160)).current;
  const timer = useRef(null);

  const mostrarToast = useCallback((titulo, texto = '', tipo = 'sucesso') => {
    clearTimeout(timer.current);
    setToast({ titulo, texto, tipo });
    y.setValue(-160);
    Animated.spring(y, { toValue: 0, useNativeDriver: true, friction: 8, tension: 60 }).start();

    timer.current = setTimeout(() => {
      Animated.timing(y, { toValue: -160, duration: 250, useNativeDriver: true }).start(() => setToast(null));
    }, 3200);
  }, [y]);

  const cor = toast?.tipo === 'erro' ? '#A3261C' : '#0F6B4F';
  const icone = toast?.tipo === 'erro' ? 'alert-circle' : 'check';

  return (
    <ToastContext.Provider value={{ mostrarToast }}>
      {children}
      {toast ? (
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: insets.top + 8,
            left: 16,
            right: 16,
            transform: [{ translateY: y }],
            zIndex: 999,
            elevation: 12,
          }}
        >
          <View
            className="flex-row items-center gap-3 rounded-full bg-white px-3 py-3"
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.18,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 6 },
              elevation: 12,
            }}
          >
            <View
              className="w-10 h-10 items-center justify-center rounded-full"
              style={{ backgroundColor: cor }}
            >
              <Feather name={icone} size={20} color="#FFFFFF" />
            </View>
            <View className="flex-1 pr-3">
              <Text className="font-manrope-extrabold text-base text-ink">{toast.titulo}</Text>
              {toast.texto ? (
                <Text className="font-manrope-medium text-sm text-muted">{toast.texto}</Text>
              ) : null}
            </View>
          </View>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}
