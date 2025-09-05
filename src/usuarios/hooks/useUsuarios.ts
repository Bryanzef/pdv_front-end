import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { Usuario } from '../../config/types';
import { useAuth } from '../../contexts/AuthContext';
import { ativarUsuario, criarUsuario, editarUsuario, excluirUsuario, getUsuarios, inativarUsuario } from '../services/usuariosApi';

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const { usuario } = useAuth();

  useEffect(() => {
    carregarUsuarios(page);
    // eslint-disable-next-line
  }, [page]);

  /**
   * Carrega a lista de usuários paginada
   */
  async function carregarUsuarios(pagina = 1) {
    setLoading(true);
    try {
      const { dados } = await getUsuarios(pagina, 10);
      setUsuarios(dados.usuarios);
      setTotal(dados.total);
      setTotalPages(dados.totalPages);
    } catch {
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Adiciona um novo usuário após validação
   */
  async function adicionarUsuario(dados: any) {
    if (!usuario || usuario.perfil !== 'admin') {
      toast.error('Apenas administradores podem criar usuários.');
      return;
    }
    // Validações básicas
    if (!dados.nome || !dados.email || !dados.senha || !dados.perfil) {
      toast.error('Todos os campos são obrigatórios.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(dados.email)) {
      toast.error('E-mail inválido.');
      return;
    }
    if (dados.senha.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    setLoading(true);
    try {
      const resp = await criarUsuario(dados);
      toast.success(resp.mensagem || 'Usuário criado com sucesso');
      await carregarUsuarios(page);
    } catch (e: any) {
      toast.error(e?.response?.data?.mensagem || 'Erro ao criar usuário');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Atualiza um usuário existente após validação
   */
  async function atualizarUsuario(id: string, dados: any) {
    if (!usuario || usuario.perfil !== 'admin') {
      toast.error('Apenas administradores podem editar usuários.');
      return;
    }
    if (!dados.nome || !dados.email || !dados.perfil) {
      toast.error('Todos os campos são obrigatórios.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(dados.email)) {
      toast.error('E-mail inválido.');
      return;
    }
    setLoading(true);
    try {
      const resp = await editarUsuario(id, dados);
      toast.success(resp.mensagem || 'Usuário atualizado com sucesso');
      await carregarUsuarios(page);
    } catch (e: any) {
      toast.error(e?.response?.data?.mensagem || 'Erro ao atualizar usuário');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Ativa um usuário, se permitido
   */
  async function ativar(id: string) {
    if (!usuario || usuario.perfil !== 'admin') {
      toast.error('Apenas administradores podem ativar usuários.');
      return;
    }
    const user = usuarios.find(u => u.id === id);
    if (user?.ativo) {
      toast.info('Usuário já está ativo.');
      return;
    }
    setLoading(true);
    try {
      const resp = await ativarUsuario(id);
      toast.success(resp.mensagem || 'Usuário ativado');
      await carregarUsuarios(page);
    } catch (e: any) {
      toast.error(e?.response?.data?.mensagem || 'Erro ao ativar usuário');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Inativa um usuário, se permitido
   */
  async function inativar(id: string) {
    if (!usuario || usuario.perfil !== 'admin') {
      toast.error('Apenas administradores podem inativar usuários.');
      return;
    }
    const user = usuarios.find(u => u.id === id);
    if (user && !user.ativo) {
      toast.info('Usuário já está inativo.');
      return;
    }
    setLoading(true);
    try {
      const resp = await inativarUsuario(id);
      toast.success(resp.mensagem || 'Usuário inativado');
      await carregarUsuarios(page);
    } catch (e: any) {
      toast.error(e?.response?.data?.mensagem || 'Erro ao inativar usuário');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Remove um usuário, se permitido
   */
  async function remover(id: string) {
    if (!usuario || usuario.perfil !== 'admin') {
      toast.error('Apenas administradores podem excluir usuários.');
      return;
    }
    setLoading(true);
    try {
      const resp = await excluirUsuario(id);
      toast.success(resp.mensagem || 'Usuário excluído');
      await carregarUsuarios(page);
    } catch (e: any) {
      if (e?.response?.status === 409 && e?.response?.data?.mensagem?.includes('vinculado')) {
        toast.error('Não é possível excluir este usuário pois está vinculado a vendas ou logs. Você pode apenas inativá-lo.');
      } else {
        toast.error(e?.response?.data?.mensagem || 'Erro ao excluir usuário');
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    usuarios,
    page,
    setPage,
    total,
    totalPages,
    loading,
    adicionarUsuario,
    atualizarUsuario,
    ativar,
    inativar,
    remover
  };
} 