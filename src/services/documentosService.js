import api from './api';

// Estado dos documentos: { estado, dados, por_preencher, documentos }
// estado: 'nao_submetido' | 'submetido' | 'verificado'
export async function obterDocumentos() {
  const { data } = await api.get('/documentos');
  return data;
}

// Envia frente, verso (e foto, se houver) de uma só vez. O servidor lê o BI e preenche os dados.
export async function enviarDocumentos({ frente, verso, foto }) {
  const form = new FormData();

  const juntar = (campo, f) => form.append(campo, { uri: f.uri, name: f.nome, type: f.mime });
  juntar('frente', frente);
  juntar('verso', verso);
  if (foto) juntar('foto', foto);

  const { data } = await api.post('/documentos', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    transformRequest: (corpo) => corpo, // não mexer no FormData
    timeout: 120000, // a leitura do BI pode demorar
  });

  return data;
}
