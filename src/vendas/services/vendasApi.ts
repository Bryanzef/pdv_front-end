import api from '../../config/api';
import type { ApiResponse } from '../../config/types';
import type { ItemCarrinho, Pagamento, Produto } from '../types';

export async function getProdutos(): Promise<Produto[]> {
  try {
    const response = await api.get('/produtos', { params: { page: 1, limit: 1000 } });
    return response.data.dados.produtos; // retorna apenas o array de produtos
  } catch (error) {
    console.error('Erro ao buscar produtos para venda:', error);
    throw error;
  }
}

export async function postVenda(data: { itens: ItemCarrinho[]; total: number; pagamento?: Pagamento }) {
  try {
    const response = await api.post<ApiResponse>('/vendas', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar venda:', error);
    throw error;
  }
} 