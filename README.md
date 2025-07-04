# 🎮 GameFriends Frontend

Interface web da plataforma **GameFriends**, desenvolvida em **Next.js** com **Redux Toolkit**. Esta aplicação consome a [API GameFriends](https://github.com/seu-usuario/GameFriends) e permite que usuários explorem, avaliem e favoritem jogos, além de oferecer uma área administrativa para gerenciamento de títulos.

---

## 📚 Sumário

- [🧰 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📋 Pré-requisitos](#-pré-requisitos)
- [🚀 Como Executar Localmente](#-como-executar-localmente)
- [🔌 Integração com a API](#-integração-com-a-api)
- [🧠 Estado Global com Redux](#-estado-global-com-redux)
- [📁 Estrutura de Páginas](#-estrutura-de-páginas)
- [📸 Funcionalidades](#-funcionalidades)
- [📄 Licença](#-licença)

---

## 🧰 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [JWT](https://jwt.io/)
- [Firebase Auth](https://firebase.google.com/docs/auth) (Google Login)
- [Tailwind CSS](https://tailwindcss.com/) ou [Material UI](https://mui.com/)
- [Axios](https://axios-http.com/) ou `fetch`

---

## 📋 Pré-requisitos

- Node.js 18+
- Yarn ou NPM
- A [API GameFriends](https://github.com/seu-usuario/GameFriends) em execução

---

## 🚀 Como Executar Localmente

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/gamefriends-frontend.git
    cd gamefriends-frontend

2. Instale as dependências:

     ```bash
    npm install
    # ou
    yarn install

3. Configure as variáveis de ambiente no arquivo .env.local:

    ```bash
    NEXT_PUBLIC_API_URL=http://https://apigamefriends.onrender.com
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...

4. Inicie a aplicação:
    ```bash
    npm run dev
    # ou
    yarn dev

## 🔌 Integração com a API
### A aplicação se comunica com a API backend para:

    Autenticação (/auth, /auth/google, /auth/register)

    Gerenciamento de jogos (/jogos)

    Avaliações (/jogos/review)

    Favoritos (/jogos/favoritos)

    Perfil do usuário (/auth/Usuario-logado, /jogos/usuario/reviews)

## 📁 Estrutura de Páginas

    app/
    ├── admin/        # Área administrativa (CRUD de jogos)
    ├── games/        # Página de exibição de todos os jogos disponíveis
    ├── login/        # Página de login (senha ou Google)
    ├── register/     # Página de registro de novo usuário
    ├── profile/      # Perfil do usuário: jogos favoritos e avaliados
    └── page.tsx      # Página inicial (home)

## 📸 Funcionalidades
- Login e registro com email/senha

- Login com Google (via Firebase Auth)

- Listagem de jogos com filtros e busca

- Avaliação de jogos com nota e comentário

- Marcar/desmarcar jogos como favoritos

- Visualização de favoritos e reviews no perfil

- Página administrativa para:

- Adicionar novo jogo

- Editar dados de jogos existentes

- Remover jogos