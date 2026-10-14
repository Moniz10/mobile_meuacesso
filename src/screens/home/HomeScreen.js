import React from 'react';
import { ScrollView, View } from 'react-native';

import { AppHeader, TituloSecao } from '../../components/app';
import { CartaoCodigo, CartaoDocumento, CartaoVisita, Saudacao } from '../../components/home';
import { documentos, ultimaVisita } from '../../data/mock';
import useAuth from '../../hooks/useAuth';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-canvas">
      <AppHeader />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Saudacao
          nome={user?.name || 'Ana Machava'}
          onAvatar={() => navigation.navigate('Profile')}
        />

        <CartaoCodigo
          codigo={user?.codigo || '48213'}
          onMostrarQR={() => navigation.navigate('Codigo')}
        />

        <TituloSecao
          titulo="Última visita"
          link="Ver tudo"
          onPress={() => navigation.navigate('Historico')}
        />
        <CartaoVisita visita={ultimaVisita} onPress={() => navigation.navigate('Historico')} />

        <TituloSecao titulo="Documentos" />
        {documentos.map((doc) => (
          <CartaoDocumento
            key={doc.id}
            documento={doc}
            onPress={() => navigation.navigate('Documentos')}
          />
        ))}
      </ScrollView>
    </View>
  );
}