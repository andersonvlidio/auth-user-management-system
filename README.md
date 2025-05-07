# Auth User Management System - Frontend

Este é o frontend do sistema de gerenciamento de usuários com autenticação (Auth User Management System). A aplicação foi construída com **React** e **Bootstrap 5**, e oferece um painel para dois tipos de usuários: `ADMIN` e `VISUALIZADOR`, com controle de acesso e interface amigável.

## ⚙️ Funcionalidades

- Autenticação via JWT
- Controle de acesso baseado em perfil (`ADMIN` e `VISUALIZADOR`)
- Cadastro e login de usuários
- Visualização da lista de usuários
- Permissões:
  - **ADMIN**: pode criar, editar e deletar qualquer usuário
  - **VISUALIZADOR**: pode apenas visualizar os usuários

## 🧪 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [JWT](https://jwt.io/)
- [Docker](https://www.docker.com/)

## 🌐 Deploy

A aplicação está em produção com deploy automático na [Vercel](https://vercel.com/)

🔗 **Link de produção:** [auth-user-management-system](https://auth-user-management-system.vercel.app/)  

## 🚀 Instalação

### 1. Clonar o repositório

```
git clone https://github.com/andersonvlidio/auth-user-management-system.git
cd auth-user-management-system-frontend 
```

### 2. Instalar dependências
```
npm install
```
### 3. Configurar variáveis de ambiente
Crie um arquivo .env na raiz do projeto com:

```
VITE_API_URL=http://localhost:3333  (Para usar back-end Local)
VITE_API_URL=https://auth-user-management-system-api.onrender.com (Para usar a api de Produção)
```
### 4. Iniciar o projeto
```
npm run dev
````

## Estrutura de Pastas
```bash

src/
├── assets/
├── components/
├── pages/
├── utils/ 
App.jsx
index.css
main.jsx
routes/
```