# MeuApp

Projecto base em **React Native (JavaScript) com Expo**.

## Como começar

```bash
# 1. Instalar o Expo e as dependências base
npm install

# 2. Instalar as bibliotecas do projecto (o Expo escolhe as versões compatíveis)
npx expo install react react-native react-native-screens react-native-safe-area-context expo-status-bar @react-native-async-storage/async-storage
npm install @react-navigation/native @react-navigation/native-stack axios

# 3. Corrigir eventuais versões incompatíveis
npx expo install --fix

# 4. Arrancar
npx expo start
```

Abra a app no telemóvel com o Expo Go (leitura do QR code) ou prima `a` (Android) / `i` (iOS) no terminal.

## Estrutura de pastas

```
meu-app/
├── App.js                  # Raiz da app (providers + navegação)
├── index.js                # Ponto de entrada
├── app.json                # Configuração do Expo
├── babel.config.js
├── package.json
└── src/
    ├── assets/             # Recursos estáticos
    │   ├── images/
    │   └── fonts/
    ├── components/         # Componentes reutilizáveis
    │   └── common/         # Button, Input, ...
    ├── constants/          # Cores, configuração, textos fixos
    ├── context/            # Estado global (AuthContext, ...)
    ├── hooks/              # Hooks personalizados
    ├── navigation/         # Navegadores (auth, principal, raiz)
    ├── screens/            # Ecrãs, uma pasta por área
    │   ├── auth/
    │   ├── home/
    │   └── profile/
    ├── services/           # API, armazenamento local, serviços
    └── utils/              # Funções auxiliares e validações
```

## Notas

- O login em `src/services/authService.js` é simulado. Substitua pelo pedido real à sua API.
- Defina o endereço da API em `src/constants/config.js`.
