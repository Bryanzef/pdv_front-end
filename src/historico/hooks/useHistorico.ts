import { useEffect, useState } from 'react';
import type { Venda } from '../../vendas/types';
import type { GetVendasParams } from '../services/historicoApi';
import { deleteVenda, getVendaById, getVendas } from '../services/historicoApi';

export function useHistorico() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [usuarioId, setUsuarioId] = useState<string>('');
  const [dataInicio, setDataInicio] = useState<string>('');
  const [dataFim, setDataFim] = useState<string>('');
  const [modalExcluir, setModalExcluir] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [modalDetalhe, setModalDetalhe] = useState<string | null>(null);
  const [vendaDetalhe, setVendaDetalhe] = useState<Venda | null>(null);
  const [carregandoDetalhe, setCarregandoDetalhe] = useState<boolean>(false);

  useEffect(() => {
    carregarVendas({ page, usuarioId, dataInicio, dataFim });
  }, [page, usuarioId, dataInicio, dataFim]);

  async function carregarVendas(params: Partial<GetVendasParams> = {}) {
    try {
      const { data, total, totalPages } = await getVendas({ page, limit: 10, ...params });
      setVendas(data);
      setTotal(total);
      setTotalPages(totalPages);
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

  async function carregarVendaDetalhe(id: string) {
    setCarregandoDetalhe(true);
    try {
      const venda = await getVendaById(id);
      setVendaDetalhe(venda);
    } catch {
      setFeedback('Erro ao carregar detalhes da venda');
      setVendaDetalhe(null);
    } finally {
      setCarregandoDetalhe(false);
    }
  }

  return {
    vendas,
    page,
    setPage,
    total,
    totalPages,
    usuarioId,
    setUsuarioId,
    dataInicio,
    setDataInicio,
    dataFim,
    setDataFim,
    modalExcluir,
    setModalExcluir,
    feedback,
    setFeedback,
    excluirVenda,
    modalDetalhe,
    setModalDetalhe,
    vendaDetalhe,
    carregarVendaDetalhe,
    carregandoDetalhe,
  };
} 