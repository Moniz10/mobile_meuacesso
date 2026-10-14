import { Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Espaço a deixar no topo para não tapar a barra de estado (hora, bateria…).
// Usa o maior valor entre a "safe area" e a altura real da barra no Android.
export default function useTopoSeguro() {
  const insets = useSafeAreaInsets();
  const barraAndroid = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;
  return Math.max(insets.top, barraAndroid);
}