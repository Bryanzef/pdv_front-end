export interface Produto {
  _id: string;
  nome: string;
  preco: number;
  tipo: 'peso' | 'fixo';
  estoque: number;
  ativo: boolean;
} 