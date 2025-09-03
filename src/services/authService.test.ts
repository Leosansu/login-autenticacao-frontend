import { login } from './authService';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

it('deve retornar token e nome ao fazer login com sucesso', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ token: 'abc123', nome: 'Cleo' }));

  const data = { email: 'cleo@email.com', password: 'senha123' };
  const resposta = await login(data);

  expect(resposta.token).toBe('abc123');
  expect(resposta.nome).toBe('Cleo');
  expect(fetchMock).toHaveBeenCalledWith(
    'http://localhost:3000/auth/login',
    expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  );
});

it('deve lançar erro se o login for inválido', async () => {
  fetchMock.mockResponseOnce('', { status: 401 });

  await expect(
    login({ email: 'errado@email.com', password: 'senhaerrada' })
  ).rejects.toThrow('Usuário ou senha inválidos');
});