# Sistema PDV Fruteira - Frontend

## 🏗️ Visão Geral
Este projeto é o frontend do sistema PDV Fruteira, integrando-se ao backend Node.js/Express para oferecer uma experiência completa de vendas, cadastro de produtos, histórico e controle de usuários.

## 🔗 Integração
- Consome as APIs REST do backend para autenticação, produtos, vendas e usuários.
- Utiliza JWT para autenticação, armazenando o token no localStorage.
- Intercepta respostas para tratar erros de autenticação e redirecionar o usuário.

## ⚙️ Tecnologias
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Context API para autenticação
- Axios para requisições HTTP

## 🚦 Fluxo de Autenticação
1. Usuário faz login pelo formulário.
2. Token JWT é salvo no localStorage.
3. Rotas protegidas só são acessíveis se autenticado.
4. Interceptores do Axios garantem que o token seja enviado e tratam erros de sessão.

## 🚀 Como rodar o projeto
1. Acesse a pasta `frontend`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   O app estará disponível em [http://localhost:5173](http://localhost:5173)

## 🧑‍💻 Scripts Úteis
- `npm run dev` — Servidor de desenvolvimento
- `npm run build` — Build de produção
- `npm run preview` — Visualização do build

## 📁 Estrutura de Pastas
- `src/components` — Componentes reutilizáveis
- `src/pages` — Páginas principais
- `src/layout` — Layout base, header, sidebar
- `src/contexts` — Contextos globais (ex: autenticação)
- `src/produtos`, `src/vendas`, `src/historico`, `src/usuarios` — Módulos de domínio
- `src/shared` — Hooks e componentes compartilhados

## 💡 Exemplo de Uso
1. Faça login com o admin padrão (veja README do backend).
2. Cadastre produtos, realize vendas e consulte o histórico.
3. Apenas admins podem acessar o cadastro de produtos e usuários.

## 📝 Observações
- O frontend depende do backend rodando e acessível na URL configurada.
- O proxy do Vite já está configurado para `/api` em desenvolvimento.

