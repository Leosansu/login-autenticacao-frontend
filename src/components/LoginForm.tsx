import React, { useState } from 'react';
import { login } from '../services/authService';
import './LoginForm.css'; // Adicione este import para usar um CSS externo

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
      alert('Login realizado com sucesso! Token: ' + resposta.token);
    } catch (err: any) {
      setErro(err.message || 'Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="profile-icon" style={{ textAlign: 'center', fontSize: 40, marginBottom: 8 }}>
          👤
        </div>
        <h2 className="login-title">Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
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
        {erro && <p className="error-message">{erro}</p>}
      </form>
    </div>
  );
};

export default LoginForm;