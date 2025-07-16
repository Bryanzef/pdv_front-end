import api from '../../config/api';
import type { Usuario } from '../../config/types';

export async function getUsuarios(page = 1, limit = 10): Promise<{ dados: { usuarios: Usuario[]; total: number; page: number; totalPages: number } }> {
  const response = await api.get('/auth/usuarios', { params: { page, limit } });
  return response.data;
} 