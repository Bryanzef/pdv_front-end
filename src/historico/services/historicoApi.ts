import api from '../../config/api';
import type { Venda } from '../../vendas/types';
import type { ApiResponse } from '../../config/types';

export async function getVendas(): Promise<Venda[]> {
  try {
    const response = await api.get<Venda[]>('/vendas');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar vendas:', error);
    throw error;
  }
}

export async function deleteVenda(id: string) {
  try {
    const response = await api.delete<ApiResponse>(`/vendas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar venda:', error);
    throw error;
  }
} 