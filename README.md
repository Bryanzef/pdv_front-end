# 🎨 Frontend - Sistema PDV Fruteira

Documentação completa do design system, layout e padrões visuais do frontend do Sistema PDV Fruteira.

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Tecnologias de UI](#-tecnologias-de-ui)
- [Design System](#-design-system)
- [Paleta de Cores](#-paleta-de-cores)
- [Tipografia](#-tipografia)
- [Layout e Estrutura](#-layout-e-estrutura)
- [Componentes](#-componentes)
- [Padrões de Interação](#-padrões-de-interação)
- [Tema Escuro/Claro](#-tema-escuroclaro)
- [Responsividade](#-responsividade)
- [Animações](#-animações)
- [Guia de Desenvolvimento](#-guia-de-desenvolvimento)

## 🎯 Visão Geral

O frontend do Sistema PDV Fruteira foi desenvolvido com foco em:
- **Usabilidade**: Interface intuitiva para operadores de PDV
- **Acessibilidade**: Suporte a diferentes necessidades dos usuários
- **Performance**: Carregamento rápido e interações fluidas
- **Consistência**: Padrões visuais uniformes em toda a aplicação
- **Responsividade**: Funciona em diferentes tamanhos de tela

## 🛠 Tecnologias de UI

### Core
- **React 18** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server

### Styling
- **Tailwind CSS** - Framework CSS utilitário
- **PostCSS** - Processamento CSS
- **Autoprefixer** - Compatibilidade de navegadores

### Componentes
- **React Router** - Roteamento
- **React Select** - Componentes de seleção
- **React Toastify** - Notificações
- **Phosphor React** - Ícones
- **Lucide React** - Ícones adicionais

### Utilitários
- **Axios** - Cliente HTTP
- **Zod** - Validação de formulários
- **jsPDF** - Geração de PDFs

## 🎨 Design System

### Princípios de Design

1. **Simplicidade**: Interface limpa e focada na funcionalidade
2. **Consistência**: Padrões visuais uniformes
3. **Hierarquia**: Organização clara de informações
4. **Feedback**: Respostas visuais para todas as ações
5. **Acessibilidade**: Suporte a diferentes necessidades

### Estrutura de Componentes

```
src/
├── components/          # Componentes globais
├── contexts/           # Contextos React (Auth, Theme)
├── layout/             # Componentes de layout
├── pages/              # Páginas da aplicação
├── shared/             # Componentes compartilhados
├── [modulo]/           # Módulos específicos
│   ├── components/     # Componentes do módulo
│   ├── hooks/          # Hooks customizados
│   ├── services/       # Serviços de API
│   └── types.ts        # Tipos TypeScript
└── config/             # Configurações
```

## 🌈 Paleta de Cores

### Cores Principais

#### Verde (Tema Principal)
```css
/* Verde Primário */
--green-50: #f0fdf4
--green-100: #dcfce7
--green-200: #bbf7d0
--green-300: #86efac
--green-400: #4ade80
--green-500: #22c55e
--green-600: #16a34a
--green-700: #15803d    /* Cor principal */
--green-800: #166534
--green-900: #14532d

/* Gradientes */
bg-gradient-to-b from-green-700 to-green-900
```

#### Cores de Status
```css
/* Sucesso */
--green-100: #dcfce7
--green-800: #166534

/* Erro */
--red-100: #fee2e2
--red-800: #991b1b

/* Aviso */
--yellow-100: #fef3c7
--yellow-800: #92400e

/* Informação */
--blue-100: #dbeafe
--blue-800: #1e40af
```

#### Cores Neutras
```css
/* Cinza Claro */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db

/* Cinza Médio */
--gray-400: #9ca3af
--gray-500: #6b7280
--gray-600: #4b5563

/* Cinza Escuro */
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827
--gray-950: #030712
```

### Tema Escuro

```css
/* Backgrounds */
--dark-bg-primary: #0f172a    /* gray-950 */
--dark-bg-secondary: #1e293b  /* gray-800 */
--dark-bg-tertiary: #334155   /* gray-700 */

/* Textos */
--dark-text-primary: #f8fafc  /* gray-50 */
--dark-text-secondary: #cbd5e1 /* gray-300 */
--dark-text-muted: #94a3b8    /* gray-400 */

/* Bordas */
--dark-border: #475569         /* gray-600 */
```

## 📝 Tipografia

### Hierarquia de Textos

```css
/* Títulos */
.text-5xl    /* 48px - Logo/Header principal */
.text-3xl    /* 30px - Títulos de página */
.text-2xl    /* 24px - Títulos de seção */
.text-xl     /* 20px - Subtítulos */

/* Corpo */
.text-lg     /* 18px - Texto destacado */
.text-base   /* 16px - Texto padrão */
.text-sm     /* 14px - Texto secundário */
.text-xs     /* 12px - Texto auxiliar */
```

### Pesos de Fonte

```css
.font-extrabold  /* 800 - Títulos principais */
.font-bold       /* 700 - Títulos de seção */
.font-semibold   /* 600 - Texto destacado */
.font-medium     /* 500 - Labels */
.font-normal     /* 400 - Texto padrão */
```

### Família de Fontes

```css
font-family: 'Arial', sans-serif;
```

## 🏗 Layout e Estrutura

### Estrutura Principal

```
┌─────────────────────────────────────────┐
│                Header                   │ ← 64px altura fixa
├─────────┬───────────────────────────────┤
│         │                               │
│ Sidebar │         Main Content          │
│         │                               │
│         │                               │
│         │                               │
└─────────┴───────────────────────────────┘
```

### LayoutBase Component

```tsx
<div className="flex h-screen bg-gray-50 dark:bg-gray-950">
  <Sidebar minimizada={sidebarMinimizada} />
  <div className={`flex-1 flex flex-col transition-all duration-300 ${
    sidebarMinimizada ? 'ml-20' : 'ml-64'
  }`}>
    <Header />
    <main className="flex-1 overflow-y-auto p-8 bg-white dark:bg-gray-900">
      {children}
    </main>
  </div>
</div>
```

### Header

- **Altura**: 64px (h-16)
- **Posição**: Sticky top-0
- **Background**: Branco/Cinza escuro
- **Conteúdo**: Logo + Toggle tema + Menu usuário

```tsx
<header className="h-16 bg-white dark:bg-gray-900 shadow flex items-center justify-between px-8 sticky top-0 z-10">
  <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
    Fruteira Sistema
  </h1>
  {/* Toggle tema e menu usuário */}
</header>
```

### Sidebar

- **Largura**: 256px (expandida) / 80px (minimizada)
- **Posição**: Fixed left-0
- **Background**: Gradiente verde
- **Transição**: 300ms suave

```tsx
<aside className={`fixed top-0 left-0 h-full z-40 bg-gradient-to-b from-green-700 to-green-900 ${
  minimizada ? 'w-20' : 'w-64'
} transition-all duration-300`}>
  {/* Logo e navegação */}
</aside>
```

## 🧩 Componentes

### Componentes de Layout

#### LayoutBase
```tsx
interface LayoutBaseProps {
  children: React.ReactNode;
}
```
- Container principal da aplicação
- Gerencia sidebar e header
- Responsivo e com tema escuro/claro

#### Header
```tsx
// Funcionalidades:
- Logo da aplicação
- Toggle de tema (claro/escuro)
- Menu do usuário com dropdown
- Indicador de perfil (admin/usuário)
```

#### Sidebar
```tsx
interface SidebarProps {
  minimizada: boolean;
  setMinimizada: Dispatch<SetStateAction<boolean>>;
}
```
- Navegação principal
- Ícones Phosphor React
- Filtro baseado em perfil de usuário
- Estados ativo/inativo

### Componentes Compartilhados

#### Modal
```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
}
```
- Overlay com backdrop
- Animação de fade-in
- Suporte a tema escuro
- Z-index: 50

#### ApiFeedback
```tsx
interface ApiFeedbackProps {
  loading?: boolean;
  error?: string | null;
  children?: React.ReactNode;
}
```
- Estados de loading
- Tratamento de erros
- Spinner animado
- Mensagens de feedback

### Componentes de Formulário

#### Padrão de Input
```tsx
<input
  className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
  placeholder="Digite..."
/>
```

#### Padrão de Botão
```tsx
<button
  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors font-semibold shadow"
>
  Ação
</button>
```

#### Padrão de Select
```tsx
<select
  className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
>
  <option>Opção</option>
</select>
```

### Componentes de Venda

#### FormularioProduto
- Select com busca de produtos
- Input numérico para peso/quantidade
- Botão de leitura de balança
- Feedback visual

#### ResumoVenda
- Grid de informações
- Cores específicas por tipo de dado
- Formatação de valores monetários
- Data/hora atual

## 🎭 Padrões de Interação

### Estados de Botão

```css
/* Normal */
bg-green-600 text-white

/* Hover */
hover:bg-green-700

/* Focus */
focus:outline-none focus:ring-2 focus:ring-green-500

/* Disabled */
disabled:opacity-50 disabled:cursor-not-allowed

/* Loading */
animate-spin (com spinner)
```

### Estados de Input

```css
/* Normal */
border border-gray-300

/* Focus */
focus:ring-2 focus:ring-green-400 focus:border-green-400

/* Error */
border-red-300 focus:ring-red-400

/* Success */
border-green-300 focus:ring-green-400
```

### Feedback Visual

#### Sucesso
```tsx
<div className="bg-green-100 text-green-800 p-2 rounded">
  Operação realizada com sucesso!
</div>
```

#### Erro
```tsx
<div className="bg-red-100 text-red-800 p-2 rounded">
  Erro na operação
</div>
```

#### Loading
```tsx
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
```

## 🌙 Tema Escuro/Claro

### Implementação

```tsx
// ThemeContext
const [theme, setTheme] = useState<'light' | 'dark'>('light');

// Aplicação no HTML
useEffect(() => {
  const root = window.document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}, [theme]);
```

### Classes Condicionais

```tsx
// Background
className="bg-white dark:bg-gray-900"

// Texto
className="text-gray-800 dark:text-gray-100"

// Bordas
className="border-gray-200 dark:border-gray-700"
```

### Toggle de Tema

```tsx
<button
  onClick={toggleTheme}
  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
>
  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
</button>
```

## 📱 Responsividade

### Breakpoints Tailwind

```css
sm: 640px   /* Tablets pequenos */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Telas grandes */
```

### Padrões Responsivos

#### Grid Responsivo
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {/* Conteúdo */}
</div>
```

#### Sidebar Responsiva
```tsx
// Desktop: Sidebar fixa
// Mobile: Sidebar colapsável
className={`${minimizada ? 'ml-20' : 'ml-64'} hidden md:block`}
```

#### Header Responsivo
```tsx
// Logo sempre visível
// Menu usuário: texto oculto em mobile
<span className="hidden md:block text-sm font-medium">
  {usuario.nome}
</span>
```

## ✨ Animações

### Transições CSS

```css
/* Transições suaves */
transition-colors duration-200
transition-all duration-300

/* Hover effects */
hover:scale-105
hover:shadow-lg

/* Focus rings */
focus:ring-2 focus:ring-green-500
```

### Animações Customizadas

```css
/* Fade in para modais */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-in-out;
}

/* Spinner de loading */
.animate-spin {
  animation: spin 1s linear infinite;
}
```

### Estados de Loading

```tsx
// Spinner simples
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>

// Botão com loading
<button disabled={loading}>
  {loading ? (
    <svg className="animate-spin h-5 w-5 mr-3">
      {/* Spinner SVG */}
    </svg>
  ) : null}
  {loading ? 'Carregando...' : 'Salvar'}
</button>
```

## 🛠 Guia de Desenvolvimento

### Estrutura de Componentes

```tsx
// 1. Imports
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

// 2. Interfaces
interface ComponentProps {
  title: string;
  onAction: () => void;
}

// 3. Componente
const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  // 4. Hooks
  const { usuario } = useAuth();
  
  // 5. Handlers
  const handleClick = () => {
    onAction();
  };
  
  // 6. Render
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
        {title}
      </h2>
      <button
        onClick={handleClick}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
      >
        Ação
      </button>
    </div>
  );
};

export default Component;
```

### Convenções de Nomenclatura

```tsx
// Componentes: PascalCase
const FormularioProduto = () => {};

// Props: camelCase
interface Props {
  nomeProduto: string;
  precoUnitario: number;
}

// Classes CSS: kebab-case (Tailwind)
className="bg-green-600 hover:bg-green-700"

// Variáveis: camelCase
const [produtoSelecionado, setProdutoSelecionado] = useState(null);
```

### Padrões de Styling

```tsx
// 1. Sempre usar classes Tailwind
// ❌ Evitar
<div style={{ backgroundColor: 'green' }}>

// ✅ Preferir
<div className="bg-green-600">

// 2. Suporte a tema escuro
// ❌ Apenas tema claro
<div className="bg-white text-black">

// ✅ Tema claro e escuro
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">

// 3. Estados interativos
// ❌ Sem feedback
<button className="bg-green-600">

// ✅ Com feedback
<button className="bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition-colors">
```

### Organização de Arquivos

```
src/
├── components/           # Componentes globais
│   ├── Login.tsx
│   └── ProtectedRoute.tsx
├── layout/              # Layout components
│   ├── LayoutBase.tsx
│   ├── Header.tsx
│   └── Sidebar.tsx
├── shared/              # Componentes compartilhados
│   ├── Modal.tsx
│   └── components/
│       └── ApiFeedback.tsx
├── [modulo]/            # Módulos específicos
│   ├── components/      # Componentes do módulo
│   ├── hooks/          # Hooks customizados
│   ├── services/       # Serviços de API
│   ├── types.ts        # Tipos TypeScript
│   └── [Modulo].tsx    # Componente principal
└── contexts/           # Contextos React
    ├── AuthContext.tsx
    └── ThemeContext.tsx
```

### Boas Práticas

1. **Componentes Funcionais**: Sempre usar function components com hooks
2. **TypeScript**: Tipar todas as props e estados
3. **Responsividade**: Testar em diferentes tamanhos de tela
4. **Acessibilidade**: Usar semantic HTML e ARIA labels
5. **Performance**: Usar React.memo quando necessário
6. **Consistência**: Seguir os padrões estabelecidos
7. **Tema**: Sempre suportar tema claro e escuro

### Debugging

```tsx
// 1. Console logs para desenvolvimento
console.log('🚀 Componente renderizado:', props);

// 2. Estados visuais para debug
{process.env.NODE_ENV === 'development' && (
  <div className="bg-yellow-100 p-2 text-xs">
    Debug: {JSON.stringify(state)}
  </div>
)}

// 3. Error boundaries
<ErrorBoundary fallback={<ErrorFallback />}>
  <Component />
</ErrorBoundary>
```

---

**Este guia serve como referência para manter a consistência visual e de código em todo o frontend do Sistema PDV Fruteira.**
