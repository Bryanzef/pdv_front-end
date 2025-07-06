import { useState, useEffect } from 'react';

import type { Produto } from '../types';
import { getProdutos, putProduto, postProduto, deleteProduto } from '../services/produtosApi';

export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nome, setNome] = useState<string>('');
  const [preco, setPreco] = useState<string>('');
  const [tipo, setTipo] = useState<'peso' | 'fixo'>('peso');
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [modalExcluir, setModalExcluir] = useState<string | null>(null);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      const data = await getProdutos();
      setProdutos(data);
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