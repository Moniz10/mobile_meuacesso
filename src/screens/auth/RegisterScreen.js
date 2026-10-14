import React, { useState } from 'react';
import { View } from 'react-native';

import {
  AuthLayout,
  BotaoGoogle,
  BotaoPrimario,
  Cabecalho,
  CaixaSelecao,
  Campo,
  Divisor,
  LinkRodape,
  Secao,
} from '../../components/ui';
import useAuth from '../../hooks/useAuth';

export default function RegisterScreen({ navigation }) {
  const { signUp } = useAuth();
  const [nome, setNome] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autorizo, setAutorizo] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sem validações: ao clicar, segue em frente.
  const criarConta = async () => {
    setLoading(true);
    await signUp({ nome, telemovel, email, password });
  };

  return (
    <AuthLayout onBack={() => navigation.goBack()}>
      <Cabecalho
        titulo="Criar conta"
        subtitulo="Depois de criar a conta recebe o seu código de 5 dígitos e o QR code."
      />

      <Secao titulo="Dados pessoais">
        <Campo
          label="Nome completo"
          icon="user"
          value={nome}
          onChangeText={setNome}
          placeholder="Como está no BI"
          autoCapitalize="words"
        />
        <Campo
          label="Telemóvel"
          icon="phone"
          value={telemovel}
          onChangeText={setTelemovel}
          placeholder="84 123 4567"
          keyboardType="phone-pad"
        />
      </Secao>

      <Secao titulo="Acesso">
        <Campo
          label="Email"
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
          placeholder="Crie uma palavra-passe"
        />
      </Secao>

      <View className="mt-1 mb-6">
        <CaixaSelecao
          marcado={autorizo}
          onChange={setAutorizo}
          texto="Autorizo as instituições a consultar os meus dados quando apresento o meu código ou QR."
        />
      </View>

      <BotaoPrimario titulo="Criar conta" onPress={criarConta} loading={loading} />
      {/* <Divisor />
      <BotaoGoogle titulo="Registar com Google" onPress={criarConta} /> */}

      <LinkRodape texto="Já tem conta?" link="Entrar" onPress={() => navigation.goBack()} />
    </AuthLayout>
  );
}