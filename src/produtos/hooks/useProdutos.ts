import { useEffect, useState } from 'react';

import { deleteProduto, getProdutos, postProduto, putProduto } from '../services/produtosApi';
import type { Produto } from '../types';

export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [nome, setNome] = useState<string>('');
  const [preco, setPreco] = useState<string>('');
  const [tipo, setTipo] = useState<'peso' | 'fixo'>('peso');
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [modalExcluir, setModalExcluir] = useState<string | null>(null);

  useEffect(() => {
    carregarProdutos(page);
  }, [page]);

  async function carregarProdutos(pagina = 1) {
    try {
      const { data, total, totalPages } = await getProdutos(pagina, 10);
      setProdutos(data);
      setTotal(total);
      setTotalPages(totalPages);
    } catch {
      setFeedback('Erro ao carregar produtos');
    }
  }

  async function cadastrarOuAtualizar() {
    if (!nome) {
      setFeedback('O nome do produto é obrigatório.');
      return;
    }
    if (isNaN(parseFloat(preco)) || parseFloat(preco) <= 0) {
      setFeedback('O preço deve ser um número positivo.');
      return;
    }
    try {
      if (editandoId) {
        await putProduto(editandoId, { nome, preco: parseFloat(preco), tipo });
        setFeedback('Produto atualizado com sucesso.');
        setEditandoId(null);
      } else {
        await postProduto({ nome, preco: parseFloat(preco), tipo });
        setFeedback('Produto cadastrado com sucesso.');
      }
      setNome('');
      setPreco('');
      setTipo('peso');
      await carregarProdutos();
    } catch (err: any) {
      setFeedback(err.response?.data?.error || 'Erro ao salvar produto');
    }
  }

  function editarProduto(produto: Produto) {
    setNome(produto.nome);
    setPreco(produto.preco.toString());
    setTipo(produto.tipo);
    setEditandoId(produto._id);
    setFeedback('');
  }

  async function excluirProduto() {
    if (!modalExcluir) return;
    try {
      await deleteProduto(modalExcluir);
      setProdutos(produtos.filter(p => p._id !== modalExcluir));
      setModalExcluir(null);
      setFeedback('Produto excluído com sucesso.');
    } catch {
      setFeedback('Erro ao excluir produto');
    }
  }

  return {
    produtos,
    page,
    setPage,
    total,
    totalPages,
    nome,
    setNome,
    preco,
    setPreco,
    tipo,
    setTipo,
    editandoId,
    setEditandoId,
    filtro,
    setFiltro,
    feedback,
    setFeedback,
    modalExcluir,
    setModalExcluir,
    cadastrarOuAtualizar,
    editarProduto,
    excluirProduto
  };
} 