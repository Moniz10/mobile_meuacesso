// import api from './api';

export async function login(email, password) {
  // Simulação: entra sempre, sem validar nada.
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    token: 'token-de-demonstracao',
    user: { name: 'Ana Machava', email, codigo: '48213' },
  };
}

export async function register({ nome, telemovel, email, password }) {
  // Simulação: cria sempre, sem validar nada.
  await new Promise((resolve) => setTimeout(resolve, 800));
  const codigo = String(Math.floor(10000 + Math.random() * 90000)); // 5 dígitos
  return {
    token: 'token-de-demonstracao',
    user: { name: nome || 'Ana Machava', telemovel, email, codigo },
  };
}