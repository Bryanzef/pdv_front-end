# Sistema PDV Fruteira - Frontend

## 🏗️ Visão Geral
Frontend React para o sistema PDV Fruteira, integrando-se ao backend para autenticação, cadastro de produtos, registro de vendas, histórico e controle de usuários.

## 🔗 Integração
- Consome APIs REST do backend.
- Autenticação JWT (token salvo no localStorage).
- Intercepta respostas para tratar erros e redirecionar.

## ⚙️ Tecnologias
- React 18 + TypeScript
- Vite, Tailwind CSS
- Context API (autenticação, tema)
- Axios para requisições HTTP

## 🏛️ Arquitetura Geral
- Estrutura modular: componentes, páginas, contextos, hooks e serviços.
- Context API para autenticação e tema global.
- Hooks customizados para lógica de domínio.

## 🔒 Fluxo de Autenticação
1. Login pelo formulário
2. Token JWT salvo no localStorage
3. Rotas protegidas por autenticação e role
4. Interceptores garantem envio do token e tratam erros

## 🚦 Rotas e Permissões
- `/login`: Login
- `/`: Vendas (autenticado)
- `/produtos`: Produtos (admin)
- `/usuarios`: Usuários (admin)
- `/historico`: Histórico de vendas (autenticado)

## 💡 Fluxos e Permissões
- **Vendas:** Qualquer usuário autenticado pode registrar vendas.
- **Produtos/Usuários:** Apenas admins podem cadastrar, editar ou remover.
- **Histórico:** Todos autenticados podem consultar.
- **Tema:** Alternância entre claro/escuro.

## 🖼️ Exemplo de Uso
1. Faça login com o admin padrão (veja README do backend).
2. Cadastre produtos, realize vendas e consulte o histórico.
3. Apenas admins acessam cadastro de produtos e usuários.

## 🛠️ Scripts Úteis
- `npm run dev` — Desenvolvimento
- `npm run build` — Build de produção
- `npm run preview` — Visualização do build

## 🚀 Como rodar o projeto
1. Acesse a pasta `frontend`
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   O app estará disponível em [http://localhost:5173](http://localhost:5173)

## 📁 Estrutura de Pastas
- `src/components` — Componentes reutilizáveis
- `src/pages` — Páginas principais
- `src/layout` — Layout base, header, sidebar
- `src/contexts` — Contextos globais (autenticação, tema)
- `src/produtos`, `src/vendas`, `src/historico`, `src/usuarios` — Módulos de domínio
- `src/shared` — Hooks e componentes compartilhados


## ❓ FAQ e Troubleshooting
- Verifique se o backend está rodando e acessível.
- Confira configurações de proxy do Vite.
- Consulte o console do navegador para erros.

## 📝 Observações
- O frontend depende do backend rodando e acessível na URL configurada.
- O proxy do Vite já está configurado para `/api` em desenvolvimento.

## 👨‍💻 Contato
Desenvolvido por Bryan — 2024

