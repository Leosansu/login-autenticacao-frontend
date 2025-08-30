import React, { useState } from 'react';
import { login } from '../services/authService';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      const resposta = await login({ email, password });
      // Aqui você pode salvar o token no localStorage ou contexto, se desejar
      alert('Login realizado com sucesso! Token: ' + resposta.token);
    } catch (err: any) {
      setErro(err.message || 'Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={carregando}>
        {carregando ? 'Entrando...' : 'Entrar'}
      </button>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </form>
  );
};

export default LoginForm;