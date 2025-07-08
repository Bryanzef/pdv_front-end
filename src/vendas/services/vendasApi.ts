import api from '../../config/api';
import type { Produto, ItemCarrinho } from '../types';
import type { ApiResponse } from '../../config/types';

export async function getProdutos(): Promise<Produto[]> {
  try {
    const response = await api.get<Produto[]>('/produtos');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos para venda:', error);
    throw error;
  }
}

export async function postVenda(data: { itens: ItemCarrinho[]; total: number }) {
  try {
    const response = await api.post<ApiResponse>('/vendas', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar venda:', error);
    throw error;
  }
} 