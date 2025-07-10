import api from '../../config/api';
import type { ApiResponse } from '../../config/types';

export interface GetVendasParams {
  page?: number;
  limit?: number;
  usuarioId?: string;
  dataInicio?: string;
  dataFim?: string;
}

export async function getVendas({ page = 1, limit = 10, usuarioId, dataInicio, dataFim }: GetVendasParams = {}) {
  try {
    const params: any = { page, limit };
    if (usuarioId) params.usuarioId = usuarioId;
    if (dataInicio) params.dataInicio = dataInicio;
    if (dataFim) params.dataFim = dataFim;
    const response = await api.get('/vendas', { params });
    return response.data; // { data, total, page, totalPages }
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

export async function getVendaById(id: string) {
  try {
    const response = await api.get(`/vendas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes da venda:', error);
    throw error;
  }
} 