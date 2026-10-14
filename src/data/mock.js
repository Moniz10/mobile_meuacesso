// Dados de exemplo (sem API). Trocar mais tarde pelos dados reais.

export const ultimaVisita = {
  instituicao: 'Ministério da Saúde',
  quando: 'Ontem',
  inicio: '09:12',
  fim: '10:05',
};

// Resumo usado no Início
export const documentos = [
  {
    id: 'bi',
    titulo: 'Bilhete de Identidade',
    descricao: 'Frente e verso enviados',
    estado: 'verificado', // verificado | analise | falta
  },
];

// Lista completa usada no separador Documentos
export const ficheirosDocumentos = [
  { id: 'bi-frente', titulo: 'BI · frente', descricao: 'Enviado hoje', estado: 'verificado', icone: 'file' },
  { id: 'bi-verso', titulo: 'BI · verso', descricao: 'Enviado hoje', estado: 'analise', icone: 'file' },
  { id: 'rosto', titulo: 'Foto do rosto', descricao: 'Para confirmar à entrada', estado: 'falta', icone: 'user' },
];



// Histórico de visitas, agrupado por dia.
// periodo: 'semana' (esta semana) | 'mes' (este mês, antes desta semana)
export const historicoVisitas = [
  {
    id: 'd1',
    dia: 'Ontem · 13 out',
    periodo: 'semana',
    visitas: [
      {
        id: 'v1',
        instituicao: 'Ministério da Saúde',
        motivo: 'pedido de declaração',
        inicio: '09:12',
        fim: '10:05',
        atendente: { nome: 'João Cossa', area: 'Direcção de Recursos Humanos' },
      },
    ],
  },
  {
    id: 'd2',
    dia: 'Segunda · 12 out',
    periodo: 'semana',
    visitas: [
      {
        id: 'v2',
        instituicao: 'Ministério da Educação',
        motivo: 'equivalência de certificado',
        inicio: '14:30',
        fim: '15:20',
        atendente: { nome: 'Luísa Matsinhe', area: 'Secretaria Geral' },
      },
    ],
  },
  {
    id: 'd3',
    dia: 'Quinta · 2 out',
    periodo: 'mes',
    visitas: [
      {
        id: 'v3',
        instituicao: 'Conservatória do Registo Civil',
        motivo: 'certidão de nascimento',
        inicio: '08:40',
        fim: '09:15',
        atendente: { nome: 'Carlos Nhantumbo', area: 'Atendimento ao Público' },
      },
    ],
  },
];