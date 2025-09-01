import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const nomeUsuario = localStorage.getItem('nome') || 'Usuário';
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-form" style={{ textAlign: 'center' }}>
        <h2>Bem-vindo ao sistema, {nomeUsuario}!</h2>
        <button onClick={() => navigate('/')}>Voltar para o Login</button>
      </div>
    </div>
  );
};

export default Dashboard;