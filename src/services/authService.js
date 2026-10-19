import api from './api';

// Login por email OU telemóvel. Devolve { token, user }.
export async function login(identificador, password) {
  const { data } = await api.post('/login', { login: identificador.trim(), password });
  const u = data.utilizador;

  return {
    token: u.token,
    user: {
      uuid: u.uuid,
      numero: u.numero, // código único de 4 dígitos (vai no QR code)
      name: u.nome,
      email: u.email,
      telemovel: u.telefone,
      tipo: u.tipo,
    },
  };
}

// Cria a conta. (O login é feito a seguir, no AuthContext.)
export async function register({ nome, telemovel, email, password }) {
  await api.post('/registro', {
    nome: nome.trim(),
    email: email.trim(),
    telefone: telemovel.trim(),
    password,
    password_confirmation: password,
  });
}
