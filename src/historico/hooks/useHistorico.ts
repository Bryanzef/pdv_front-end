import { useState, useEffect } from 'react';
import { getVendas, deleteVenda } from '../services/historicoApi';
import type { Venda } from '../../vendas/types';

export function useHistorico() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [modalExcluir, setModalExcluir] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    carregarVendas();
  }, []);

  async function carregarVendas() {
    try {
      const data = await getVendas();
      setVendas(data);
    } catch {
      setFeedback('Erro ao carregar vendas');
    }
  }

  async function excluirVenda() {
    if (!modalExcluir) return;
    try {
      await deleteVenda(modalExcluir);
      setVendas(vendas.filter(v => v._id !== modalExcluir));
      setModalExcluir(null);
      setFeedback('Venda excluída com sucesso.');
    } catch {
      setFeedback('Erro ao excluir venda');
    }
  }

  return {
    vendas,
    modalExcluir,
    setModalExcluir,
    feedback,
    setFeedback,
    excluirVenda
  };
} 