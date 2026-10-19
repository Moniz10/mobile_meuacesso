import React from 'react';
import { Text } from 'react-native';

import { Grupo } from '../app';
import { LinhaInfo } from '../perfil';

// [campo da API, rótulo, ícone] — pela ordem em que aparecem no ecrã
const LINHAS = [
  ['numero_documento', 'Nº do BI', 'hash'],
  ['nome_completo', 'Nome completo', 'user'],
  ['sexo', 'Sexo', 'users'],
  ['data_nascimento', 'Data de nascimento', 'calendar'],
  ['naturalidade', 'Naturalidade', 'map-pin'],
  ['nacionalidade', 'Nacionalidade', 'flag'],
  ['estado_civil', 'Estado civil', 'heart'],
  ['altura_cm', 'Altura', 'arrow-up'],
  ['nome_pai', 'Nome do pai', 'user'],
  ['nome_mae', 'Nome da mãe', 'user'],
  ['morada', 'Morada', 'home'],
  ['profissao', 'Profissão', 'briefcase'],
  ['documento_emitido_em', 'Emitido em', 'map-pin'],
  ['documento_data_emissao', 'Data de emissão', 'calendar'],
  ['documento_data_validade', 'Válido até', 'calendar'],
];

const ROTULOS = {
  nomes: 'Nomes',
  apelidos: 'Apelidos',
  ...Object.fromEntries(LINHAS.map(([campo, rotulo]) => [campo, rotulo])),
};

function dataBonita(aaaammdd) {
  const [a, m, d] = String(aaaammdd).split('-');
  return d && m && a ? `${d}/${m}/${a}` : aaaammdd;
}

function formatar(campo, valor) {
  if (campo === 'sexo') return valor === 'M' ? 'Masculino' : valor === 'F' ? 'Feminino' : valor;
  if (campo.startsWith('data_') || campo.includes('_data_')) return dataBonita(valor);
  if (campo === 'altura_cm') return `${(Number(valor) / 100).toFixed(2).replace('.', ',')} m`;
  if (campo === 'estado_civil') {
    const t = String(valor).replace('_', ' ');
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  return String(valor);
}

// Os dados que o servidor leu do BI, e o que ficou por ler.
export default function DadosBI({ dados, porPreencher = [] }) {
  if (!dados) return null;

  const linhas = LINHAS.filter(([campo]) => dados[campo] != null && dados[campo] !== '').map(
    ([campo, rotulo, icone]) => (
      <LinhaInfo key={campo} icone={icone} rotulo={rotulo} valor={formatar(campo, dados[campo])} />
    )
  );

  // "Nomes" e "Apelidos" já aparecem juntos em "Nome completo"
  const naoLidos = porPreencher.filter((c) => c !== 'nomes' && c !== 'apelidos').map((c) => ROTULOS[c] || c);

  return (
    <>
      <Grupo titulo="Dados lidos do BI">{linhas}</Grupo>

      {naoLidos.length > 0 ? (
        <Text className="font-manrope-medium text-xs leading-5 text-muted mt-3 ml-1">
          Não foi possível ler: {naoLidos.join(', ')}.
        </Text>
      ) : null}
    </>
  );
}
