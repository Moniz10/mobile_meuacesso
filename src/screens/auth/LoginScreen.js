import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';

import {
  AuthLayout,
  BotaoGoogle,
  BotaoPrimario,
  Cabecalho,
  CaixaErro,
  Campo,
  Divisor,
  LinkRodape,
} from '../../components/ui';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import { mensagemDeErro } from '../../utils/erros';

export default function LoginScreen({ navigation, route }) {
  const { signIn } = useAuth();
  const { mostrarToast } = useToast();
  const [email, setEmail] = useState(route?.params?.email ?? '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const entrar = async () => {
    setErro(null);

    if (!email.trim() || !password) {
      setErro('Escreva o email (ou telemóvel) e a palavra-passe.');
      return;
    }

    setLoading(true);
    try {
      const nome = await signIn(email, password); // se correr bem, a app muda sozinha para o Início
      mostrarToast(`Boas-vindas, ${nome}!`, 'Sessão iniciada com sucesso.');
    } catch (e) {
      setErro(mensagemDeErro(e, 'Não foi possível entrar.'));
      setLoading(false);
    }
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

      <CaixaErro texto={erro} />

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
