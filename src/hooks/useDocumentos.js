import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { obterDocumentos } from '../services/documentosService';
import { mensagemDeErro } from '../utils/erros';

// Estado dos documentos do utilizador. Volta a pedir à API sempre que o ecrã fica visível.
export default function useDocumentos() {
  const [info, setInfo] = useState(null); // resposta da API
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    setErro(null);
    try {
      setInfo(await obterDocumentos());
    } catch (e) {
      setErro(mensagemDeErro(e, 'Não foi possível carregar os documentos.'));
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  return {
    info,
    estado: info?.estado ?? null, // nao_submetido | submetido | verificado
    carregando,
    erro,
    recarregar: carregar,
    definir: setInfo, // para actualizar logo com a resposta do envio
  };
}
