import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

// Mock do useNavigate para evitar navegação real nos testes
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('LoginForm', () => {
  it('deve renderizar campos de email, senha, botão Entrar e link Criar conta', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    expect(screen.getByText(/Criar conta/i)).toBeInTheDocument();
  });
});