import { useEffect, useState } from 'react';
import { getProdutos, postVenda } from '../services/vendasApi';
import type { FormaPagamento, ItemCarrinho, Produto, ProdutoOption } from '../types';
import { gerarPdfVenda } from '../utils/pdfHelpers';

export function useVendas() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pesoOuQuantidade, setPesoOuQuantidade] = useState<string>('');
  const [selectedProduto, setSelectedProduto] = useState<ProdutoOption | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<ItemCarrinho & { index: number } | null>(null);

  // Pagamento
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>('dinheiro');
  const [valorPago, setValorPago] = useState<number>(0);
  const [troco, setTroco] = useState<number>(0);
  const [parcelas, setParcelas] = useState<number>(1);

  useEffect(() => {
    getProdutos()
      .then((produtos) => setProdutos(produtos))
      .catch(() => setFeedback('Erro ao carregar produtos'));
  }, []);

  // Atualizar troco automaticamente para dinheiro
  useEffect(() => {
    if (formaPagamento === 'dinheiro') {
      setTroco(valorPago > total ? valorPago - total : 0);
    } else {
      setTroco(0);
    }
  }, [valorPago, total, formaPagamento]);

  // Validação de pagamento
  const validarPagamento = () => {
    if (valorPago < total) {
      setFeedback('Valor pago não pode ser menor que o total da venda.');
      return false;
    }
    if (formaPagamento === 'credito') {
      if (parcelas < 1 || parcelas > 12) {
        setFeedback('Número de parcelas inválido.');
        return false;
      }
      if (total / parcelas < 5) {
        setFeedback('Valor mínimo por parcela: R$ 5,00.');
        return false;
      }
    }
    return true;
  };

  const produtoOptions: ProdutoOption[] = produtos.map(p => ({
    value: p.nome,
    label: `${p.imagem} ${p.nome} - R$ ${p.preco.toFixed(2)} (${p.tipo === 'peso' ? 'kg' : 'un'})`,
    produto: p
  }));

  const handleProdutoChange = (selectedOption: ProdutoOption | null) => {
    setSelectedProduto(selectedOption);
    setPesoOuQuantidade('');
    setFeedback('');
  };

  const lerPesoBalanca = () => {
    const peso = (Math.random() * 5).toFixed(3);
    setPesoOuQuantidade(peso);
    setFeedback('');
  };

  const adicionarAoCarrinho = () => {
    if (!selectedProduto) {
      setFeedback('Selecione um produto.');
      return;
    }
    const quantidade = parseFloat(pesoOuQuantidade);
    if (isNaN(quantidade) || quantidade <= 0) {
      setFeedback('Peso/quantidade deve ser um número positivo.');
      return;
    }
    const produto = selectedProduto.produto;
    const subtotal = produto.preco * quantidade;
    setCarrinho([...carrinho, { ...produto, quantidade, subtotal, precoOriginal: produto.preco }]);
    setTotal(total + subtotal);
    setPesoOuQuantidade('');
    setSelectedProduto(null);
    setFeedback('Item adicionado ao carrinho.');
  };

  const abrirModalEditar = (index: number) => {
    setEditItem({ index, ...carrinho[index] });
    setModalOpen('editar');
  };

  const salvarEdicao = (quantidade: number, preco: number, justificativa: string) => {
    if (!editItem) return;
    if (isNaN(quantidade) || quantidade <= 0) {
      setFeedback('Peso/quantidade deve ser um número positivo.');
      return;
    }
    if (isNaN(preco) || preco <= 0) {
      setFeedback('O preço deve ser um número positivo.');
      return;
    }
    if (preco !== editItem.precoOriginal && !justificativa) {
      setFeedback('Justificativa é obrigatória para alteração de preço.');
      return;
    }
    const novosItens = [...carrinho];
    const item = novosItens[editItem.index];
    const subtotalAnterior = item.subtotal;
    item.quantidade = quantidade;
    item.preco = preco;
    item.subtotal = preco * quantidade;
    if (preco !== item.precoOriginal) item.justificativa = justificativa;
    else delete item.justificativa;
    setCarrinho(novosItens);
    setTotal(total - subtotalAnterior + item.subtotal);
    setModalOpen(null);
    setFeedback('Item editado com sucesso.');
  };

  const removerItem = (index: number) => {
    const item = carrinho[index];
    setCarrinho(carrinho.filter((_, i) => i !== index));
    setTotal(total - item.subtotal);
    setFeedback('Item removido do carrinho.');
  };

  const finalizarVenda = async () => {
    if (carrinho.length === 0) {
      setFeedback('O carrinho está vazio.');
      return;
    }
    if (!validarPagamento()) return;
    gerarPdfVenda(carrinho, total);
    await postVenda({
      itens: carrinho,
      total,
      pagamento: {
        forma: formaPagamento,
        valorPago,
        troco,
        parcelas: formaPagamento === 'credito' ? parcelas : undefined
      }
    });
    setCarrinho([]);
    setTotal(0);
    setValorPago(0);
    setTroco(0);
    setParcelas(1);
    setFormaPagamento('dinheiro');
    setModalOpen(null);
    setFeedback('Venda finalizada com sucesso!');
  };

  const cancelarVenda = () => {
    setCarrinho([]);
    setTotal(0);
    setModalOpen(null);
    setFeedback('Venda cancelada.');
  };

  // Para uso no componente de pagamento
  const valoresPredefinidos = [10, 20, 50, 100];

  return {
    produtos,
    carrinho,
    total,
    pesoOuQuantidade,
    selectedProduto,
    feedback,
    modalOpen,
    editItem,
    produtoOptions,
    setPesoOuQuantidade,
    setSelectedProduto,
    setModalOpen,
    setEditItem,
    setFeedback,
    handleProdutoChange,
    lerPesoBalanca,
    adicionarAoCarrinho,
    abrirModalEditar,
    salvarEdicao,
    removerItem,
    finalizarVenda,
    cancelarVenda,
    // Pagamento
    formaPagamento,
    setFormaPagamento,
    valorPago,
    setValorPago,
    troco,
    parcelas,
    setParcelas,
    valoresPredefinidos
  };
} 