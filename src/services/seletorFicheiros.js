import { Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

// Os três caminhos para obter um ficheiro: câmara, galeria e gestor de ficheiros.
// Cada função devolve { uri, nome, mime, tamanho, origem } ou null (cancelou / erro).

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

function pedirPermissao(texto) {
  Alert.alert('Permissão necessária', texto, [
    { text: 'Agora não', style: 'cancel' },
    { text: 'Abrir definições', onPress: () => Linking.openSettings() },
  ]);
}

function validar(ficheiro) {
  if (ficheiro.tamanho && ficheiro.tamanho > MAX_BYTES) {
    Alert.alert('Ficheiro demasiado grande', 'O tamanho máximo é 8 MB. Escolha outra imagem.');
    return null;
  }
  return ficheiro;
}

function daImagem(resultado, origem) {
  if (resultado.canceled || !resultado.assets?.length) return null;
  const a = resultado.assets[0];
  return validar({
    uri: a.uri,
    nome: a.fileName || `foto-${Date.now()}.jpg`,
    mime: a.mimeType || 'image/jpeg',
    tamanho: a.fileSize ?? null,
    origem,
  });
}

// Câmara. frontal = true usa a câmara da frente (para a fotografia da pessoa).
export async function tirarFoto({ frontal = false } = {}) {
  try {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      pedirPermissao('Permita o acesso à câmara para tirar a fotografia.');
      return null;
    }
    const r = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      cameraType: frontal ? ImagePicker.CameraType.front : ImagePicker.CameraType.back,
    });
    return daImagem(r, 'camera');
  } catch {
    Alert.alert('Erro', 'Não foi possível abrir a câmara.');
    return null;
  }
}

// Galeria de fotos (o sistema pede a permissão sozinho quando é preciso).
export async function daGaleria() {
  try {
    const r = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });
    return daImagem(r, 'galeria');
  } catch {
    Alert.alert('Erro', 'Não foi possível abrir a galeria.');
    return null;
  }
}

// Gestor de ficheiros (Ficheiros no iPhone, Documentos no Android). aceitaPdf = false → só imagens.
export async function dosFicheiros({ aceitaPdf = true } = {}) {
  try {
    const r = await DocumentPicker.getDocumentAsync({
      type: aceitaPdf ? ['image/*', 'application/pdf'] : ['image/*'],
      copyToCacheDirectory: true,
    });
    if (r.canceled || !r.assets?.length) return null;
    const a = r.assets[0];
    return validar({
      uri: a.uri,
      nome: a.name || `ficheiro-${Date.now()}`,
      mime: a.mimeType || 'application/octet-stream',
      tamanho: a.size ?? null,
      origem: 'ficheiros',
    });
  } catch {
    Alert.alert('Erro', 'Não foi possível abrir os ficheiros.');
    return null;
  }
}