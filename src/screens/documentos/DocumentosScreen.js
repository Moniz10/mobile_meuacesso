import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { AppHeader, Etiqueta, Grupo, TituloEcra } from '../../components/app';
import { DadosBI, EscolherOrigem, EstadoDocumentos, SlotDocumento } from '../../components/documentos';
import { CaixaErro } from '../../components/ui';
import useToast from '../../hooks/useToast';
import useDocumentos from '../../hooks/useDocumentos';
import { enviarDocumentos } from '../../services/documentosService';
import { daGaleria, dosFicheiros, tirarFoto } from '../../services/seletorFicheiros';
import { mensagemDeErro } from '../../utils/erros';

// Os ficheiros pedidos ao cidadão. O BI (frente e verso) é obrigatório; a fotografia é opcional.
const ESPACOS = [
  {
    id: 'frente',
    titulo: 'BI · frente',
    descricao: 'Lado com a sua fotografia',
    icone: 'credit-card',
    aceitaPdf: false, // o servidor lê imagens (JPG ou PNG)
    frontal: false,
  },
  {
    id: 'verso',
    titulo: 'BI · verso',
    descricao: 'Lado com a filiação e a morada',
    icone: 'credit-card',
    aceitaPdf: false,
    frontal: false,
  },
  {
    id: 'foto',
    titulo: 'A sua fotografia (opcional)',
    descricao: 'Fotografia formal, como a do BI',
    aviso: 'Fotografia formal, igual à do BI: fundo liso e claro, rosto de frente e descoberto, sem óculos escuros, boné, filtros ou outras pessoas.',
    icone: 'user',
    aceitaPdf: false,
    frontal: true, // câmara da frente
    circular: true,
  },
];

const NOMES_DOS_TIPOS = { frente: 'BI · frente', verso: 'BI · verso', foto: 'A sua fotografia' };

export default function DocumentosScreen() {
  const { mostrarToast } = useToast();
  const { info, estado, carregando, erro, recarregar, definir } = useDocumentos();

  const [ficheiros, setFicheiros] = useState({ frente: null, verso: null, foto: null });
  const [aberto, setAberto] = useState(null); // id do espaço com a folha aberta
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState(null);
  const [reenviar, setReenviar] = useState(false); // já submetido, mas quer enviar de novo

  const espaco = ESPACOS.find((e) => e.id === aberto);
  const completo = !!ficheiros.frente && !!ficheiros.verso; // a foto é opcional

  // Mostra o formulário quando ainda não submeteu (ou quer enviar de novo)
  const mostrarFormulario = estado === 'nao_submetido' || reenviar;

  function guardarFicheiro(id, ficheiro) {
    if (ficheiro) setFicheiros((antes) => ({ ...antes, [id]: ficheiro }));
  }

  async function escolher(origem) {
    const actual = espaco;
    setAberto(null); // fecha a folha antes de abrir a câmara/galeria

    if (!actual) return;
    // Pequena pausa: no iOS a câmara só abre depois da folha fechar.
    await new Promise((r) => setTimeout(r, 350));

    let ficheiro = null;
    if (origem === 'camera') ficheiro = await tirarFoto({ frontal: actual.frontal });
    if (origem === 'galeria') ficheiro = await daGaleria();
    if (origem === 'ficheiros') ficheiro = await dosFicheiros({ aceitaPdf: actual.aceitaPdf });

    guardarFicheiro(actual.id, ficheiro);
  }

  function remover(e) {
    Alert.alert('Remover ficheiro', `Quer remover "${e.titulo}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => setFicheiros((antes) => ({ ...antes, [e.id]: null })) },
    ]);
  }

  async function enviar() {
    setErroEnvio(null);
    setEnviando(true);

    try {
      const resposta = await enviarDocumentos(ficheiros);
      definir(resposta); // a resposta já traz o estado, os dados lidos e as imagens
      mostrarToast('BI submetido!', 'Lemos os seus dados com sucesso.');
      setFicheiros({ frente: null, verso: null, foto: null });
      setReenviar(false);
    } catch (e) {
      setErroEnvio(mensagemDeErro(e, 'Não foi possível enviar os documentos.'));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <View className="flex-1 bg-canvas">
      <AppHeader />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={false} onRefresh={recarregar} />}
      >
        <TituloEcra
          titulo="Documentos"
          subtitulo="Envie o seu BI (frente e verso) para que as instituições possam confirmar quem é."
        />

        {/* A carregar o estado */}
        {carregando && !info ? (
          <View className="items-center py-10">
            <ActivityIndicator color="#0F6B4F" />
          </View>
        ) : null}

        {/* Não foi possível falar com a API */}
        {erro && !info ? (
          <>
            <CaixaErro texto={erro} />
            <Pressable
              onPress={recarregar}
              className="h-12 items-center justify-center rounded-2xl border border-primary bg-white active:bg-primary-50"
            >
              <Text className="font-manrope-bold text-base text-primary">Tentar de novo</Text>
            </Pressable>
          </>
        ) : null}

        {info ? <EstadoDocumentos estado={estado} /> : null}

        {/* JÁ SUBMETEU: imagens enviadas + dados lidos */}
        {info && !mostrarFormulario ? (
          <>
            <Grupo titulo="Documentos enviados">
              {(info.documentos || []).map((doc) => (
                <View key={doc.tipo} className="flex-row items-center gap-4 px-4 py-4">
                  <Image
                    source={{ uri: doc.url }}
                    resizeMode="cover"
                    className={`w-16 h-16 bg-field ${doc.tipo === 'foto' ? 'rounded-full' : 'rounded-xl'}`}
                  />
                  <View className="flex-1">
                    <Text className="font-manrope-bold text-base text-ink">
                      {NOMES_DOS_TIPOS[doc.tipo] || doc.tipo}
                    </Text>
                    <Text numberOfLines={1} className="font-manrope-medium text-sm text-muted mt-0.5">
                      {doc.nome}
                    </Text>
                  </View>
                  <Etiqueta estado={doc.estado === 'verificado' ? 'verificado' : 'submetido'} />
                </View>
              ))}
            </Grupo>

            <DadosBI dados={info.dados} porPreencher={info.por_preencher} />

            {estado === 'submetido' ? (
              <Pressable
                onPress={() => setReenviar(true)}
                className="mt-6 h-14 flex-row items-center justify-center gap-2 rounded-2xl border border-primary bg-white active:bg-primary-50"
              >
                <Feather name="refresh-cw" size={17} color="#0F6B4F" />
                <Text className="font-manrope-bold text-base text-primary">Enviar o BI novamente</Text>
              </Pressable>
            ) : null}
          </>
        ) : null}

        {/* AINDA NÃO SUBMETEU (ou quer enviar de novo): escolher os ficheiros */}
        {info && mostrarFormulario ? (
          <>
            {ESPACOS.map((e) => (
              <React.Fragment key={e.id}>
                <SlotDocumento
                  titulo={e.titulo}
                  descricao={e.descricao}
                  icone={e.icone}
                  circular={e.circular}
                  ficheiro={ficheiros[e.id]}
                  onEscolher={() => setAberto(e.id)}
                  onRemover={() => remover(e)}
                />
                {e.aviso ? (
                  <View className="flex-row gap-3 rounded-2xl bg-primary-50 p-4 mb-3 -mt-1">
                    <Feather name="info" size={18} color="#0F6B4F" />
                    <Text className="flex-1 font-manrope-medium text-sm text-ink">{e.aviso}</Text>
                  </View>
                ) : null}
              </React.Fragment>
            ))}

            <CaixaErro texto={erroEnvio} />

            <Pressable
              disabled={!completo || enviando}
              onPress={enviar}
              className={`mt-2 h-14 items-center justify-center rounded-2xl ${
                completo ? 'bg-primary active:bg-primary-700' : 'bg-line'
              }`}
            >
              <Text className={`font-manrope-extrabold text-base ${completo ? 'text-white' : 'text-muted'}`}>
                Enviar documentos
              </Text>
            </Pressable>
            {!completo && (
              <Text className="font-manrope text-xs text-muted text-center mt-2">
                Adicione a frente e o verso do BI para poder enviar.
              </Text>
            )}

            {reenviar ? (
              <Pressable
                onPress={() => {
                  setReenviar(false);
                  setErroEnvio(null);
                  setFicheiros({ frente: null, verso: null, foto: null });
                }}
                className="mt-3 h-12 items-center justify-center rounded-xl active:bg-field"
              >
                <Text className="font-manrope-bold text-sm text-muted">Cancelar</Text>
              </Pressable>
            ) : null}
          </>
        ) : null}
      </ScrollView>

      <EscolherOrigem
        visivel={!!aberto}
        titulo={espaco?.titulo ?? ''}
        aviso={espaco?.aviso}
        aceitaPdf={espaco?.aceitaPdf}
        aoFechar={() => setAberto(null)}
        aoEscolher={escolher}
      />

      {/* Enquanto o servidor lê o BI */}
      {enviando ? (
        <View className="absolute inset-0 items-center justify-center bg-black/50 px-10">
          <View className="items-center rounded-3xl bg-white px-8 py-7">
            <ActivityIndicator size="large" color="#0F6B4F" />
            <Text className="font-manrope-extrabold text-lg text-ink mt-4 text-center">A ler o seu BI…</Text>
            <Text className="font-manrope-medium text-sm text-muted mt-1 text-center">
              Pode demorar alguns segundos. Não feche a aplicação.
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}
