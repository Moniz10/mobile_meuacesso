import React, { useState } from 'react';
import { View } from 'react-native';

import {
  AuthLayout,
  BotaoGoogle,
  BotaoPrimario,
  Cabecalho,
  CaixaErro,
  CaixaSelecao,
  Campo,
  Divisor,
  LinkRodape,
  Secao,
} from '../../components/ui';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import { mensagemDeErro } from '../../utils/erros';

export default function RegisterScreen({ navigation }) {
  const { signUp } = useAuth();
  const { mostrarToast } = useToast();
  const [nome, setNome] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autorizo, setAutorizo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const criarConta = async () => {
    setErro(null);

    if (nome.trim().length < 3) return setErro('Escreva o seu nome completo.');
    if (!telemovel.trim()) return setErro('Escreva o número de telemóvel.');
    if (!email.trim()) return setErro('Escreva o seu email.');
    if (password.length < 8) return setErro('A palavra-passe deve ter pelo menos 8 caracteres.');
    if (!autorizo) return setErro('Para continuar, aceite a autorização de consulta dos dados.');

    setLoading(true);
    try {
      await signUp({ nome, telemovel, email, password });
      setLoading(false);
      mostrarToast('Conta criada!', 'Agora entre com o seu email e palavra-passe.');
      navigation.navigate('Login', { email: email.trim() });
    } catch (e) {
      setErro(mensagemDeErro(e, 'Não foi possível criar a conta.'));
      setLoading(false);
    }
  };

  return (
    <AuthLayout onBack={() => navigation.goBack()}>
      <Cabecalho
        titulo="Criar conta"
        subtitulo="Depois de criar a conta recebe o seu código de 4 dígitos e o QR code."
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

      <CaixaErro texto={erro} />

      <BotaoPrimario titulo="Criar conta" onPress={criarConta} loading={loading} />
      {/* <Divisor />
      <BotaoGoogle titulo="Registar com Google" onPress={criarConta} /> */}

      <LinkRodape texto="Já tem conta?" link="Entrar" onPress={() => navigation.goBack()} />
    </AuthLayout>
  );
}