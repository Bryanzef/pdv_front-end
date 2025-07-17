import type { Produto as ProdutoType } from '../produtos/types';

export interface Item {
  nome: string;
  quantidade: number;
  preco: number;
  precoOriginal?: number;
  tipo: string;
  justificativa?: string;
  subtotal: number;
}

export type FormaPagamento = 'dinheiro' | 'debito' | 'credito' | 'pix';

export interface Pagamento {
  forma: FormaPagamento;
  valorPago: string; // Decimal como string
  troco?: string | null;
  parcelas?: number;
}

export interface Venda {
  _id: string;
  data: string;
  itens: Item[];
  total: string; // Decimal como string
  valorPago: string; // Decimal como string
  troco?: string | null;
  pagamento?: Pagamento;
  usuario?: {
    nome: string;
    email: string;
  };
}

export interface ItemCarrinho extends ProdutoType {
  quantidade: number;
  subtotal: number;
  precoOriginal: number;
  justificativa?: string;
}

export interface ProdutoOption {
  value: string;
  label: string;
  produto: ProdutoType;
}

declare global {
  interface ImportMeta {
    env: {
      VITE_API_URL: string;
      [key: string]: any;
    };
  }
} 