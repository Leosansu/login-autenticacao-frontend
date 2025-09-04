import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

// Mock do useNavigate para evitar navegação real nos testes
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

// Mock do login
jest.mock('../services/authService', () => ({
  login: jest.fn(),
}));

import { login } from '../services/authService';

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('deve renderizar campos de email, senha, botão Entrar e link Criar conta', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    expect(screen.getByText(/Criar conta/i)).toBeInTheDocument();
  });

  it('envia o formulário com sucesso e redireciona', async () => {
    jest.useFakeTimers();
    (login as jest.Mock).mockResolvedValueOnce({ token: 'abc123', nome: 'Usuário Teste' });

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@test.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: 'senha123' } });
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    expect(await screen.findByText(/Login realizado com sucesso!/i)).toBeInTheDocument();

    // Avance o tempo para disparar o setTimeout
    jest.advanceTimersByTime(1200);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
    });

    jest.useRealTimers();
  });

  it('exibe mensagem de erro ao falhar o login', async () => {
    // Mock do login para rejeitar a Promise simulando erro
    (login as jest.Mock).mockRejectedValueOnce({ message: 'Credenciais inválidas' });

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@erro.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: 'senhaerrada' } });
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    // Espera a mensagem de erro aparecer
    expect(await screen.findByText(/Credenciais inválidas/i)).toBeInTheDocument();

    // Garante que não salvou token nem nome no localStorage
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('nome')).toBeNull();

    // Garante que não houve redirecionamento
    expect(mockedNavigate).not.toHaveBeenCalled();
  });
});