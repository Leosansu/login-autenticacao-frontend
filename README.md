# Projeto Login e Autenticação - Frontend

Este projeto é um frontend em React + TypeScript para autenticação de usuários, consumindo uma API backend.

## Funcionalidades

- Tela de login com campos de e-mail e senha
- Integração com API para autenticação
- Exibição de mensagens de erro em caso de falha no login

## Como executar o projeto

1. **Instale as dependências:**
   ```
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```
   npm start
   ```
   O app será aberto no navegador, normalmente em [http://localhost:3000](http://localhost:3000) ou [http://localhost:3001](http://localhost:3001).

3. **Pré-requisitos:**
   - Certifique-se de que a API backend está rodando e acessível (por padrão em `http://localhost:3000`).

## Estrutura de Pastas

- `src/components` — Componentes reutilizáveis (ex: LoginForm)
- `src/pages` — Páginas da aplicação (ex: LoginPage)
- `src/services` — Serviços para comunicação com a API
- `src/types` — Tipos e interfaces TypeScript

## Scripts Disponíveis

- `npm start` — Executa o app em modo desenvolvimento
- `npm run build` — Gera uma versão otimizada para produção
- `npm test` — Executa os testes automatizados

## Observações

- Este projeto foi criado com [Create React App](https://github.com/facebook/create-react-app).
- Para autenticação, o backend deve aceitar requisições CORS do endereço do frontend.
- O campo de senha enviado para a API deve ser `password`.

---

Desenvolvido para fins de estudo e demonstração de autenticação com React e TypeScript.
