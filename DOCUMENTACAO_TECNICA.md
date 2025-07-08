# 📋 Documentação Técnica - Sistema de Fruteira

## 🏗️ Arquitetura Geral

O sistema é composto por uma **arquitetura cliente-servidor** com separação clara entre frontend e backend:

```
┌─────────────────┐    HTTP/JSON    ┌─────────────────┐
│   Frontend      │ ◄─────────────► │    Backend      │
│   (React/Vite)  │                 │  (Node/Express) │
└─────────────────┘                 └─────────────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │    MongoDB      │
                                    │   (Atlas)       │
                                    └─────────────────┘
```

---

## 🎯 Frontend (React + TypeScript + Vite)

### 📦 Tecnologias Principais

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **React** | 18.3.1 | Framework principal |
| **TypeScript** | 5.5.2 | Tipagem estática |
| **Vite** | 7.0.2 | Build tool e dev server |
| **Tailwind CSS** | 3.4.17 | Framework CSS |
| **React Router** | 6.26.1 | Roteamento |
| **Axios** | 1.7.7 | Cliente HTTP |
| **Zod** | 3.25.74 | Validação de dados |
| **jsPDF** | 3.0.1 | Geração de PDFs |

### 🗂️ Estrutura de Pastas

```
frontend/src/
├── 📁 config/           # Configurações globais
│   ├── api.ts          # Cliente Axios configurado
│   ├── types.ts        # Tipos globais
│   └── index.ts        # Exports
├── 📁 layout/          # Componentes de layout
│   ├── LayoutBase.tsx  # Layout principal
│   ├── Header.tsx      # Cabeçalho
│   └── Sidebar.tsx     # Menu lateral
├── 📁 pages/           # Páginas principais
│   ├── VendasPage.tsx  # Página de vendas
│   ├── ProdutosPage.tsx # Página de produtos
│   └── HistoricoPage.tsx # Página de histórico
├── 📁 vendas/          # Módulo de vendas
│   ├── Vendas.tsx      # Componente principal
│   ├── components/     # Componentes específicos
│   ├── hooks/          # Custom hooks
│   ├── services/       # APIs de vendas
│   ├── types.ts        # Tipos do módulo
│   └── validation/     # Schemas de validação
├── 📁 produtos/        # Módulo de produtos
│   ├── Produtos.tsx    # Componente principal
│   ├── components/     # Componentes específicos
│   ├── hooks/          # Custom hooks
│   ├── services/       # APIs de produtos
│   ├── types.ts        # Tipos do módulo
│   └── validation/     # Schemas de validação
├── 📁 historico/       # Módulo de histórico
│   ├── Historico.tsx   # Componente principal
│   ├── components/     # Componentes específicos
│   ├── hooks/          # Custom hooks
│   └── services/       # APIs de histórico
└── 📁 shared/          # Componentes compartilhados
    ├── components/     # Componentes reutilizáveis
    ├── hooks/          # Hooks compartilhados
    └── utils/          # Utilitários
```

### 🔄 Fluxo de Dados

```
1. Usuário interage com componente
2. Componente chama custom hook
3. Hook chama service (API)
4. Service faz requisição HTTP via Axios
5. Backend processa e retorna dados
6. Hook atualiza estado local
7. Componente re-renderiza com novos dados
```

### 🌐 Configuração de API

**Arquivo:** `src/config/api.ts`

```typescript
// Proxy automático em desenvolvimento
const API_BASE_URL = import.meta.env.DEV ? '/api' : 'http://localhost:5000/api';

// Interceptors para logs e tratamento de erro
api.interceptors.request.use(/* logs de requisição */);
api.interceptors.response.use(/* logs de resposta e tratamento de erro */);
```

**Proxy Vite:** `vite.config.ts`
```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  }
}
```

---

## ⚙️ Backend (Node.js + Express + TypeScript)

### 📦 Tecnologias Principais

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Node.js** | - | Runtime JavaScript |
| **Express** | 4.19.2 | Framework web |
| **TypeScript** | 5.5.2 | Tipagem estática |
| **Mongoose** | 8.7.0 | ODM para MongoDB |
| **MongoDB** | 6.17.0 | Driver oficial |
| **dotenv** | 16.4.5 | Variáveis de ambiente |

### 🗂️ Estrutura de Pastas

```
back-end/src/
├── 📁 models/          # Modelos do MongoDB
│   ├── Produto.ts     # Schema de produtos
│   └── Venda.ts       # Schema de vendas
├── 📁 routes/          # Rotas da API
│   ├── produtos.ts    # CRUD de produtos
│   └── vendas.ts      # CRUD de vendas
├── 📁 middleware/      # Middlewares (futuro)
├── 📁 scripts/         # Scripts utilitários (futuro)
└── server.ts          # Servidor principal
```

### 🗄️ Modelos de Dados

#### Produto
```typescript
interface IProduto {
  nome: string;        // Nome único do produto
  preco: number;       // Preço unitário
  tipo: 'peso' | 'fixo'; // Tipo de venda
  imagem: string;      // Emoji/ícone (padrão: 📦)
}
```

#### Venda
```typescript
interface IVenda {
  data: Date;          // Data/hora da venda
  itens: IItem[];      // Lista de itens vendidos
  total: number;       // Valor total da venda
}

interface IItem {
  nome: string;        // Nome do produto
  quantidade: number;  // Quantidade/peso
  preco: number;       // Preço unitário
  precoOriginal?: number; // Preço original (se alterado)
  tipo: string;        // Tipo do produto
  justificativa?: string; // Justificativa para alteração de preço
  subtotal: number;    // Subtotal do item
}
```

### 🔌 Endpoints da API

#### Produtos (`/api/produtos`)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/` | Lista todos os produtos |
| `POST` | `/` | Cadastra novo produto |
| `PUT` | `/:id` | Atualiza produto existente |
| `DELETE` | `/:id` | Remove produto |

#### Vendas (`/api/vendas`)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/` | Lista todas as vendas |
| `POST` | `/` | Registra nova venda |
| `DELETE` | `/:id` | Remove venda |

### 🔐 Configuração de Segurança

**Variáveis de Ambiente** (`.env`):
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
PORT=5000
NODE_ENV=development
```

**Validações:**
- ✅ Verificação obrigatória de `MONGODB_URI`
- ✅ Validação de schemas do Mongoose
- ✅ Tratamento de erros centralizado
- ✅ Logs informativos com emojis

---

## 🎨 Interface do Usuário

### 🎯 Páginas Principais

#### 1. **Vendas** (`/`)
- **Funcionalidade:** Registro de vendas em tempo real
- **Características:**
  - Seleção de produtos com dropdown
  - Suporte a produtos por peso e quantidade fixa
  - Carrinho com edição de itens
  - Cálculo automático de totais
  - Geração de PDF da venda
  - Integração com balança (simulada)

#### 2. **Produtos** (`/produtos`)
- **Funcionalidade:** Gerenciamento completo de produtos
- **Características:**
  - CRUD completo (Criar, Ler, Atualizar, Deletar)
  - Filtro por nome
  - Validação de dados com Zod
  - Confirmação para exclusão
  - Feedback visual de operações

#### 3. **Histórico** (`/historico`)
- **Funcionalidade:** Visualização de vendas realizadas
- **Características:**
  - Lista paginada de vendas
  - Detalhes completos de cada venda
  - Exclusão de vendas
  - Filtros por data (futuro)

### 🎨 Design System

**Framework:** Tailwind CSS
- **Cores:** Verde como cor principal (fruteira)
- **Layout:** Responsivo com sidebar colapsável
- **Componentes:** Cards com sombras e bordas arredondadas
- **Feedback:** Mensagens coloridas (verde=sucesso, vermelho=erro)

---

## 🔄 Fluxos de Negócio

### 1. **Registro de Venda**
```
1. Usuário seleciona produto
2. Informa quantidade/peso
3. Sistema calcula preço
4. Item adicionado ao carrinho
5. Usuário pode editar/remover itens
6. Finaliza venda
7. Sistema salva no banco
8. Gera PDF (opcional)
9. Limpa carrinho
```

### 2. **Gerenciamento de Produtos**
```
1. Usuário acessa página de produtos
2. Pode cadastrar novo produto
3. Pode editar produto existente
4. Pode excluir produto (com confirmação)
5. Pode filtrar produtos por nome
6. Feedback visual de todas as operações
```

### 3. **Histórico de Vendas**
```
1. Usuário acessa histórico
2. Visualiza lista de vendas
3. Pode ver detalhes de cada venda
4. Pode excluir venda (com confirmação)
5. Dados organizados por data
```

---

## 🛠️ Funcionalidades Técnicas

### 📊 Validação de Dados
- **Frontend:** Zod para validação de formulários
- **Backend:** Mongoose schemas para validação de modelos
- **API:** Validação de entrada em todas as rotas

### 🔍 Tratamento de Erros
- **Frontend:** Interceptors do Axios para logs e tratamento
- **Backend:** Try/catch em todas as rotas
- **UI:** Feedback visual para usuário

### 📱 Responsividade
- **Mobile-first:** Design adaptável
- **Sidebar:** Colapsável em telas menores
- **Tabelas:** Scroll horizontal quando necessário

### 🚀 Performance
- **Lazy Loading:** Componentes carregados sob demanda
- **Memoização:** Hooks otimizados
- **Caching:** Dados em estado local

---

## 🔧 Configuração e Deploy

### 🏃‍♂️ Desenvolvimento

**Frontend:**
```bash
cd frontend
npm install
npm run dev  # http://localhost:3000
```

**Backend:**
```bash
cd back-end
npm install
# Criar arquivo .env com MONGODB_URI
npm run dev  # http://localhost:5000
```

### 🏗️ Build de Produção

**Frontend:**
```bash
npm run build  # Gera pasta dist/
npm run preview  # Preview do build
```

**Backend:**
```bash
npm run build  # Compila TypeScript
npm start      # Executa servidor
```

### 🌍 Deploy

**Frontend:** Qualquer servidor estático (Netlify, Vercel, etc.)
**Backend:** Servidor Node.js (Heroku, Railway, etc.)
**Banco:** MongoDB Atlas (já configurado)

---

## 🔮 Melhorias Futuras

### 📈 Funcionalidades Planejadas
- [ ] Relatórios de vendas
- [ ] Dashboard com métricas
- [ ] Sistema de usuários/autenticação
- [ ] Backup automático
- [ ] Integração com impressoras térmicas
- [ ] App mobile

### 🛡️ Segurança
- [ ] Autenticação JWT
- [ ] Rate limiting
- [ ] Validação de entrada mais robusta
- [ ] Logs de auditoria

### ⚡ Performance
- [ ] Cache Redis
- [ ] Paginação no backend
- [ ] Lazy loading de imagens
- [ ] Service Workers para offline

---

## 📝 Conclusão

O sistema de fruteira é uma aplicação **full-stack moderna** com:

✅ **Arquitetura limpa** e bem estruturada  
✅ **Separação de responsabilidades** clara  
✅ **Tecnologias atuais** e bem mantidas  
✅ **Interface intuitiva** e responsiva  
✅ **Código tipado** e validado  
✅ **Documentação completa**  

O projeto está **pronto para produção** e pode ser facilmente expandido com novas funcionalidades conforme necessário. 