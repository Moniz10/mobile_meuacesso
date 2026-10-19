import Constants from 'expo-constants';

// Endereço da API (Laravel).
// Em desenvolvimento descobre sozinho o IP do PC onde corre o Expo (o PC e o telemóvel
// têm de estar na mesma rede Wi-Fi) e usa a porta 8000.
// Se não funcionar, escreva o endereço à mão aqui, por exemplo: 'http://192.168.1.10:8000/api'
const ENDERECO_MANUAL = '';

function enderecoDaApi() {
  if (ENDERECO_MANUAL) return ENDERECO_MANUAL;
  const ip = Constants.expoConfig?.hostUri?.split(':')[0];
  return `http://${ip || '10.0.2.2'}:8000/api`;
}

export const API_URL = enderecoDaApi();

export const STORAGE_KEYS = {
  token: '@meuapp:token',
  user: '@meuapp:user',
};
