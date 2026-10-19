import React from 'react';
import { ScrollView, View } from 'react-native';

import { AppHeader, TituloSecao } from '../../components/app';
import { CartaoCodigo, CartaoDocumento, CartaoVisita, Saudacao } from '../../components/home';
import { ultimaVisita } from '../../data/mock';
import useAuth from '../../hooks/useAuth';
import useDocumentos from '../../hooks/useDocumentos';

// O que se escreve no cartão do BI em cada estado
const TEXTOS_BI = {
  nao_submetido: 'Ainda não enviou o seu BI. Envie a frente e o verso para poder ser atendido com o seu código.',
  submetido: 'Frente e verso enviados. Os seus dados foram lidos do BI.',
  verificado: 'O seu BI foi verificado.',
};

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const { estado, carregando, erro, recarregar } = useDocumentos();

  // Cartão do BI: a carregar, com erro, ou com o estado vindo da API
  let cartaoBI;
  if (erro) {
    cartaoBI = {
      descricao: `${erro} Toque para tentar de novo.`,
      estado: null,
    };
  } else if (carregando || !estado) {
    cartaoBI = { descricao: 'A carregar…', estado: null };
  } else {
    cartaoBI = { descricao: TEXTOS_BI[estado], estado };
  }

  return (
    <View className="flex-1 bg-canvas">
      <AppHeader />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Saudacao nome={user?.name || 'Utilizador'} onAvatar={() => navigation.navigate('Profile')} />

        <CartaoCodigo codigo={user?.numero || '0000'} onMostrarQR={() => navigation.navigate('Codigo')} />

        <TituloSecao
          titulo="Última visita"
          link="Ver tudo"
          onPress={() => navigation.navigate('Historico')}
        />
        <CartaoVisita visita={ultimaVisita} onPress={() => navigation.navigate('Historico')} />

        <TituloSecao titulo="Documentos" />
        <CartaoDocumento
          documento={{ titulo: 'Bilhete de Identidade', ...cartaoBI }}
          onPress={erro ? recarregar : () => navigation.navigate('Documentos')}
        />
      </ScrollView>
    </View>
  );
}
