# 🍉 PDV Sistema - Frontend

**Sistema de PDV (Ponto de Venda) - Frontend desenvolvido com React, TypeScript e Vite**

> ⚠️ **AVISO LEGAL**: Este projeto é de propriedade exclusiva de **Bryan Zef**. É **PROIBIDO** copiar, distribuir, modificar ou usar este código sem autorização expressa por escrito do autor. Todos os direitos reservados.

## 🚀 Tecnologias

- **React 18** - Biblioteca para interfaces
- **TypeScript** - Linguagem tipada
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de dados
- **Lucide React** - Ícones

## 📋 Funcionalidades

- ✅ Interface moderna e responsiva
- ✅ Autenticação de usuários
- ✅ Gestão de produtos
- ✅ Gestão de usuários
- ✅ Sistema de vendas com carrinho
- ✅ Relatórios e histórico
- ✅ Geração de PDF
- ✅ Tema claro/escuro
- ✅ Notificações toast

## 🛠️ Instalação e Configuração Local

### 1. Pré-requisitos
- Node.js 18+ instalado
- Backend do PDV rodando localmente (porta 5000)
- Banco de dados PostgreSQL/Supabase configurado

### 2. Clone o repositório
```bash
git clone https://github.com/Bryanzef/pdv_front-end.git
cd pdv_front-end
```

### 3. Instale as dependências
```bash
npm install
```

### 4. Configure as variáveis de ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env
```

### 5. Configure o arquivo `.env` para desenvolvimento local
```env
# Para desenvolvimento local, deixe vazio para usar proxy do Vite
VITE_API_URL=

# Configurações opcionais
VITE_APP_NAME=PDV Sistema
VITE_APP_VERSION=1.0.0
```

### 6. Execute o projeto
```bash
# Modo desenvolvimento
npm run dev

# O servidor iniciará em http://localhost:5173
```

## 🔧 Configuração do Backend Local

Para o frontend funcionar localmente, você precisa do backend rodando:

### 1. Clone o backend
```bash
git clone https://github.com/Bryanzef/pdv_back-end.git
cd pdv_back-end
```

### 2. Configure o backend
```bash
# Instale dependências
npm install

# Configure .env
cp env.example .env
```

### 3. Configure o .env do backend
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_URL=sua_url_do_banco
JWT_SECRET=sua_chave_secreta
```

### 4. Execute o backend
```bash
# Desenvolvimento
npm run dev

# O backend rodará em http://localhost:5000
```

## 🚀 Executando

### Desenvolvimento
```bash
npm run dev
# Acesse: http://localhost:5173
```

### Build para Produção
```bash
npm run build
```

### Preview do Build
```bash
npm run preview
```

## 🌐 Configuração da API

O frontend se conecta ao backend através da variável de ambiente `VITE_API_URL`:

- **Desenvolvimento**: Usa proxy do Vite (`/api`)
- **Produção**: Usa a URL configurada em `VITE_API_URL`

### Exemplo de configuração para Vercel:

1. Acesse o painel da Vercel
2. Vá em Settings > Environment Variables
3. Adicione:
   - `VITE_API_URL` = `https://seu-backend.herokuapp.com`

## 📱 Páginas e Funcionalidades

### Autenticação
- Login de usuários
- Proteção de rotas
- Gerenciamento de sessão

### Dashboard
- Visão geral do sistema
- Estatísticas rápidas
- Acesso rápido às funcionalidades

### Produtos
- Listagem de produtos
- Cadastro/edição de produtos
- Busca e filtros
- Gestão de estoque

### Vendas
- Interface de vendas
- Carrinho de compras
- Cálculo de totais
- Formas de pagamento
- Geração de PDF

### Usuários
- Gestão de usuários
- Controle de permissões
- Criação de contas

### Relatórios
- Histórico de vendas
  - Relatórios por período
  - Exportação de dados

## 🎨 Design System

### Cores
- Primária: Azul (#3B82F6)
- Secundária: Verde (#10B981)
- Aviso: Amarelo (#F59E0B)
- Erro: Vermelho (#EF4444)

### Componentes
- Botões com variantes
- Inputs estilizados
- Cards informativos
- Modais responsivos
- Tabelas com paginação

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── contexts/      # Contextos React
├── hooks/         # Custom hooks
├── services/      # Serviços da API
├── config/        # Configurações
├── shared/        # Componentes compartilhados
├── utils/         # Utilitários
└── types/         # Definições de tipos
```

## 🔧 Configuração do Build

O projeto está configurado para otimização de produção:

- **Code Splitting**: Chunks separados para vendor, router e UI
- **Minificação**: Terser para otimização
- **Tree Shaking**: Remoção de código não utilizado
- **Source Maps**: Desabilitados em produção

## 🚀 Deploy na Vercel

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente
3. Configure o build command: `npm run build`
4. Configure o output directory: `dist`
5. Deploy automático a cada push

### Configuração Recomendada na Vercel

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

## 🔒 Segurança

- Validação de dados com Zod
- Sanitização de inputs
- Headers de segurança
- Proteção de rotas sensíveis
- Gerenciamento seguro de tokens

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🧪 Testes

```bash
# Executar testes (quando implementados)
npm run test

# Executar testes com coverage
npm run test:coverage
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para [seu-email@exemplo.com] ou abra uma issue no GitHub.

## 🔗 Links Úteis

- [Documentação do React](https://react.dev/)
- [Documentação do Vite](https://vitejs.dev/)
- [Documentação do Tailwind CSS](https://tailwindcss.com/)
- [Documentação da Vercel](https://vercel.com/docs)