import { API_URL } from '../constants/config';

// Transforma um erro numa mensagem simples para mostrar ao utilizador.
export function mensagemDeErro(erro, padrao = 'Ocorreu um erro. Tente novamente.') {
  // O servidor respondeu: usa a mensagem dele
  if (erro?.response) {
    const dados = erro.response.data;

    // Erros de validação do Laravel: { errors: { campo: ['mensagem'] } }
    if (dados?.errors) {
      const primeiro = Object.values(dados.errors)[0];
      if (Array.isArray(primeiro) && primeiro[0]) return primeiro[0];
    }

    return dados?.mensagem || dados?.message || padrao;
  }

  if (erro?.code === 'ECONNABORTED') {
    return 'O servidor demorou demasiado a responder. Tente novamente.';
  }

  // Pedido feito mas sem resposta: rede, API desligada ou endereço errado
  if (erro?.request || erro?.code === 'ERR_NETWORK') {
    return `Sem ligação ao servidor (${API_URL}). Verifique a rede e se a API está ligada.`;
  }

  // Erro dentro da própria app (não é da rede): mostra o motivo para ser fácil de corrigir
  return `${padrao} (${erro?.message || 'erro interno'})`;
}
