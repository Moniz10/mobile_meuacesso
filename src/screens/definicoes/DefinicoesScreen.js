import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { AppHeader, Grupo, TituloEcra } from '../../components/app';
import { LinhaInterruptor, LinhaLink } from '../../components/definicoes';

export default function DefinicoesScreen({ navigation }) {
  // Só estado local: os interruptores mudam mas não guardam nada.
  const [notifVisitas, setNotifVisitas] = useState(true);
  const [notifDocs, setNotifDocs] = useState(true);
  const [partilharFoto, setPartilharFoto] = useState(false);

  return (
    <View className="flex-1 bg-canvas">
      <AppHeader />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <TituloEcra titulo="Definições" subtitulo="Ajuste a app à sua maneira." />

        <Grupo titulo="Notificações">
          <LinhaInterruptor
            icone="bell"
            titulo="Visitas"
            descricao="Avisar quando uma visita é registada"
            valor={notifVisitas}
            onChange={setNotifVisitas}
          />
          <LinhaInterruptor
            icone="file-text"
            titulo="Documentos"
            descricao="Avisar quando um documento é verificado"
            valor={notifDocs}
            onChange={setNotifDocs}
          />
        </Grupo>

        <Grupo titulo="Privacidade">
          <LinhaInterruptor
            icone="camera"
            titulo="Partilhar foto do rosto"
            descricao="As instituições veem a sua foto à entrada"
            valor={partilharFoto}
            onChange={setPartilharFoto}
          />
          <LinhaLink icone="shield" titulo="Instituições autorizadas" valor="3" />
        </Grupo>

        <Grupo titulo="Conta">
          <LinhaLink icone="user" titulo="O meu perfil" onPress={() => navigation.navigate('Profile')} />
          <LinhaLink icone="lock" titulo="Alterar palavra-passe" />
          <LinhaLink icone="globe" titulo="Idioma" valor="Português" />
        </Grupo>

        <Grupo titulo="Sobre">
          <LinhaLink icone="info" titulo="Sobre o MeuAcesso" valor="v1.0.0" />
          <LinhaLink icone="file" titulo="Termos e privacidade" />
        </Grupo>

        <Text className="font-manrope text-xs text-muted text-center mt-8">
          MeuAcesso · versão 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}