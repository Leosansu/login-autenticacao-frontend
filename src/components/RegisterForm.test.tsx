import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  jest.useRealTimers();
});

describe('RegisterForm', () => {
  it('deve renderizar campos de nome, email, senha e botão Cadastrar', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cadastrar/i })).toBeInTheDocument();
  });

  it('envia o formulário com sucesso e redireciona', async () => {
    jest.useFakeTimers();
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    }) as any;

    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Usuário Teste' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@teste.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: 'senha123' } });
    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    expect(await screen.findByText(/Cadastro realizado com sucesso!/i)).toBeInTheDocument();
    expect(localStorage.getItem('nome')).toBe('Usuário Teste');

    jest.advanceTimersByTime(1500);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/');
    });

    jest.useRealTimers();
  });
});