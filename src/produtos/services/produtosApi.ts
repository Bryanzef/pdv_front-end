import api from '../../config/api';
import type { ApiResponse } from '../../config/types';
import type { Produto } from '../types';

export async function getProdutos(page = 1, limit = 10) {
  try {
    const response = await api.get('/produtos', { params: { page, limit } });
    return response.data; // { data, total, page, totalPages }
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
}

export async function postProduto(data: { nome: string; preco: number; tipo: 'peso' | 'fixo' }) {
  try {
    const response = await api.post<ApiResponse<Produto>>('/produtos', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
}

export async function putProduto(id: string, data: { nome: string; preco: number; tipo: 'peso' | 'fixo' }) {
  try {
    const response = await api.put<ApiResponse<Produto>>(`/produtos/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error;
  }
}

export async function deleteProduto(id: string) {
  try {
    const response = await api.delete<ApiResponse>(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    throw error;
  }
} 