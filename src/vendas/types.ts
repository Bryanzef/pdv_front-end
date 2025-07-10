export interface Item {
  nome: string;
  quantidade: number;
  preco: number;
  precoOriginal?: number;
  tipo: string;
  justificativa?: string;
  subtotal: number;
}

export interface Venda {
  _id: string;
  data: string;
  itens: Item[];
  total: number;
  usuario?: {
    nome: string;
    email: string;
  };
}

export interface Produto {
  _id: string;
  nome: string;
  preco: number;
  tipo: 'peso' | 'fixo';
  imagem: string;
}

export interface ItemCarrinho extends Produto {
  quantidade: number;
  subtotal: number;
  precoOriginal: number;
  justificativa?: string;
}

export interface ProdutoOption {
  value: string;
  label: string;
  produto: Produto;
}

declare global {
  interface ImportMeta {
    env: {
      VITE_API_URL: string;
      [key: string]: any;
    };
  }
} 