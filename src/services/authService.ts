export interface LoginData {
  email: string;
  password: string; // <-- Corriga aqui
}

export interface AuthResponse {
  token: string;
  // Adicione outros campos retornados pela sua API, se necessário
}

export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Usuário ou senha inválidos');
  }

  return response.json();
}