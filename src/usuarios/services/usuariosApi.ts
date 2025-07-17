import api from '../../config/api';

export async function getUsuarios(page = 1, limit = 10) {
  try {
    const response = await api.get('/usuarios', { params: { page, limit } });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
} 