import { useEffect, useState } from 'react';
import type { Usuario } from '../../config/types';
import { getUsuarios } from '../services/usuariosApi';

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    carregarUsuarios(page);
  }, [page]);

  async function carregarUsuarios(pagina = 1) {
    setLoading(true);
    try {
      const { dados } = await getUsuarios(pagina, 10);
      setUsuarios(dados.usuarios);
      setTotal(dados.total);
      setTotalPages(dados.totalPages);
      setFeedback('');
    } catch {
      setFeedback('Erro ao carregar usuários');
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
    feedback
  };
} 