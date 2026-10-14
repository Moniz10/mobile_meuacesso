import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';

import {
  AuthLayout,
  BotaoGoogle,
  BotaoPrimario,
  Cabecalho,
  Campo,
  Divisor,
  LinkRodape,
} from '../../components/ui';
import useAuth from '../../hooks/useAuth';

export default function LoginScreen({ navigation }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Sem validações: ao clicar, segue em frente.
  const entrar = async () => {
    setLoading(true);
    await signIn(email, password);
  };

  return (
    <AuthLayout nota="Ao continuar, aceita os Termos e a Política de Privacidade.">
      <Cabecalho
        titulo="Entrar"
        subtitulo="Bem-vindo de volta. Aceda à sua conta para continuar."
      />

      <Campo
        label="Telemóvel ou email"
        icon="mail"
        value={email}
        onChangeText={setEmail}
        placeholder="nome@exemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Campo
        label="Palavra-passe"
        icon="lock"
        senha
        value={password}
        onChangeText={setPassword}
        placeholder="A sua palavra-passe"
      />

      <Pressable className="self-start -mt-1 mb-6" hitSlop={8}>
        <Text className="font-manrope-semibold text-sm text-primary">Esqueci a palavra-passe</Text>
      </Pressable>

      <BotaoPrimario titulo="Entrar" onPress={entrar} loading={loading} />
      {/* <Divisor /> */}
      {/* <BotaoGoogle onPress={entrar} /> */}

      <LinkRodape
        texto="Ainda não tem conta?"
        link="Criar conta"
        onPress={() => navigation.navigate('Register')}
      />
    </AuthLayout>
  );
}