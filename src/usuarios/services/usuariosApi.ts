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

export async function getUsuarioPorId(id: string) {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
}

export async function criarUsuario(dados: any) {
  const response = await api.post('/auth/registro', dados);
  return response.data;
}

export async function editarUsuario(id: string, dados: any) {
  const response = await api.put(`/usuarios/${id}`, dados);
  return response.data;
}

export async function ativarUsuario(id: string) {
  const response = await api.patch(`/usuarios/${id}/ativar`);
  return response.data;
}

export async function inativarUsuario(id: string) {
  const response = await api.patch(`/usuarios/${id}/inativar`);
  return response.data;
}

export async function excluirUsuario(id: string) {
  const response = await api.delete(`/usuarios/${id}`);
  return response.data;
}

export async function getLogsUsuario(id: string) {
  const response = await api.get(`/usuarios/${id}/logs`);
  return response.data;
} 