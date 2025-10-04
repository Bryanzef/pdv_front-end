import { useEffect, useState } from 'react';
import type { Produto } from '../../produtos/types';
import { getProdutos, postVenda } from '../services/vendasApi';
import type { FormaPagamento, ItemCarrinho, ProdutoOption } from '../types';
import { gerarPdfVenda } from '../utils/pdfHelpers';
import { validarPagamentoVenda } from '../utils/validacaoVenda';

export function useVendas() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pesoOuQuantidade, setPesoOuQuantidade] = useState<string>('');
  const [selectedProduto, setSelectedProduto] = useState<ProdutoOption | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<ItemCarrinho & { index: number } | null>(null);
  const [carregando, setCarregando] = useState<boolean>(false);

  // Pagamento
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>('dinheiro');
  const [valorPagoInput, setValorPagoInput] = useState<string>('');
  const valorPago = parseFloat(valorPagoInput.replace(',', '.')) || 0;
  const [troco, setTroco] = useState<number>(0);
  const [parcelas, setParcelas] = useState<number>(1);

  useEffect(() => {
    setCarregando(true);
    getProdutos()
      .then((produtos) => {
        setProdutos(produtos);
        setCarregando(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar produtos:', error);
        setFeedback('Erro ao carregar produtos');
        setCarregando(false);
      });
  }, []);

  // Atualizar troco automaticamente para dinheiro
  useEffect(() => {
    if (formaPagamento === 'dinheiro') {
      setTroco(valorPago > total ? valorPago - total : 0);
    } else {
      setTroco(0);
    }
  }, [valorPago, total, formaPagamento]);

  const produtoOptions: ProdutoOption[] = produtos.map(p => ({
    value: p.nome,
    label: `${p.nome} - R$ ${p.preco.toFixed(2)} (${p.tipo === 'peso' ? 'kg' : 'un'})`,
    produto: p
  }));

  const handleProdutoChange = (selectedOption: ProdutoOption | null) => {
    setSelectedProduto(selectedOption);
    setPesoOuQuantidade('');
    setFeedback('');
  };

  const lerPesoBalanca = () => {
    try {
      setCarregando(true);
      // Simula leitura da balança com um pequeno atraso
      setTimeout(() => {
        const peso = (Math.random() * 5).toFixed(3);
        setPesoOuQuantidade(peso);
        setFeedback('');
        setCarregando(false);
      }, 800);
    } catch (error) {
      setFeedback('Não foi possível conectar à balança. Tente novamente.');
      setCarregando(false);
    }
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
    
    try {
      const produto = selectedProduto.produto;
      const subtotal = produto.preco * quantidade;
      setCarrinho([...carrinho, { ...produto, quantidade, subtotal, precoOriginal: produto.preco }]);
      setTotal(total + subtotal);
      setPesoOuQuantidade('');
      setSelectedProduto(null);
      setFeedback('Item adicionado ao carrinho.');
      
      // Limpa a mensagem de sucesso após 2 segundos
      setTimeout(() => {
        if (feedback === 'Item adicionado ao carrinho.') {
          setFeedback('');
        }
      }, 2000);
    } catch (error) {
      setFeedback('Erro ao adicionar item ao carrinho. Tente novamente.');
    }
  };

  const abrirModalEditar = (index: number) => {
    if (index >= 0 && index < carrinho.length) {
      setEditItem({ index, ...carrinho[index] });
      setModalOpen('editar');
    } else {
      setFeedback('Erro ao editar item. Índice inválido.');
    }
  };

  const salvarEdicao = (quantidade: number, preco: number, justificativa: string) => {
    if (!editItem) {
      setFeedback('Erro ao salvar: nenhum item selecionado.');
      return;
    }
    
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
    
    try {
      setCarregando(true);
      const novosItens = [...carrinho];
      const item = novosItens[editItem.index];
      const subtotalAnterior = item.subtotal;
      item.quantidade = quantidade;
      item.preco = preco;
      item.subtotal = preco * quantidade;
      if (preco !== item.precoOriginal) item.justificativa = justificativa;
      else delete item.justificativa;
      
      // Simulamos um pequeno delay para melhorar a experiência do usuário
      setTimeout(() => {
        setCarrinho(novosItens);
        setTotal(total - subtotalAnterior + item.subtotal);
        setModalOpen(null);
        setFeedback('Item atualizado com sucesso.');
        setCarregando(false);
        
        // Limpa a mensagem de sucesso após 2 segundos
        setTimeout(() => {
          if (feedback === 'Item atualizado com sucesso.') {
            setFeedback('');
          }
        }, 2000);
      }, 500);
    } catch (error) {
      setCarregando(false);
      setFeedback('Erro ao atualizar item. Tente novamente.');
    }
  };

  const removerItem = (index: number) => {
    try {
      if (index >= 0 && index < carrinho.length) {
        const item = carrinho[index];
        setCarrinho(carrinho.filter((_, i) => i !== index));
        setTotal(total - item.subtotal);
        setFeedback('Item removido do carrinho.');
        
        // Limpa a mensagem de sucesso após 2 segundos
        setTimeout(() => {
          if (feedback === 'Item removido do carrinho.') {
            setFeedback('');
          }
        }, 2000);
      } else {
        setFeedback('Erro ao remover item. Índice inválido.');
      }
    } catch (error) {
      setFeedback('Erro ao remover item. Tente novamente.');
    }
  };

  const finalizarVenda = async (imprimir?: boolean) => {
    if (carrinho.length === 0) {
      setFeedback('O carrinho está vazio.');
      return;
    }
    
    if (!validarPagamentoVenda({ formaPagamento, valorPagoInput, total, parcelas, setFeedback })) return;
    
    setCarregando(true);
    
    try {
      const itensParaEnviar = carrinho.map(item => ({
        nome: item.nome,
        preco: Number(item.preco),
        quantidade: item.quantidade,
        productId: item._id
      }));
      
      await postVenda({
        itens: itensParaEnviar,
        total: total.toFixed(2),
        pagamento: {
          forma: formaPagamento,
          valorPago: valorPago.toFixed(2),
          troco: troco ? troco.toFixed(2) : undefined,
          parcelas: formaPagamento === 'credito' ? parcelas : undefined
        }
      });
      
      if (imprimir) {
        gerarPdfVenda(carrinho, total);
      }
      
      // Resetar o estado
      setCarrinho([]);
      setTotal(0);
      setValorPagoInput('');
      setTroco(0);
      setParcelas(1);
      setFormaPagamento('dinheiro');
      setModalOpen(null);
      setFeedback('Venda finalizada com sucesso!');
      setCarregando(false);
      
      // Limpa a mensagem de sucesso após 3 segundos
      setTimeout(() => {
        if (feedback === 'Venda finalizada com sucesso!') {
          setFeedback('');
        }
      }, 3000);
    } catch (e: any) {
      setCarregando(false);
      const mensagemErro = e?.response?.data?.erro || 
                        e?.response?.data?.detalhes?.message || 
                        'Erro de comunicação com o servidor';
      setFeedback('Erro ao finalizar venda: ' + mensagemErro);
    }
  };

  const cancelarVenda = () => {
    if (carrinho.length === 0) {
      setFeedback('Não há itens para cancelar.');
      return;
    }
    
    setCarregando(true);
    
    // Simulamos um pequeno delay para melhorar a experiência do usuário
    setTimeout(() => {
      setCarrinho([]);
      setTotal(0);
      setModalOpen(null);
      setFormaPagamento('dinheiro');
      setValorPagoInput('');
      setTroco(0);
      setParcelas(1);
      setFeedback('Venda cancelada com sucesso.');
      setCarregando(false);
      
      // Limpa a mensagem após 2 segundos
      setTimeout(() => {
        if (feedback === 'Venda cancelada com sucesso.') {
          setFeedback('');
        }
      }, 2000);
    }, 500);
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
    carregando,
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
    valorPago: valorPagoInput,
    setValorPago: setValorPagoInput,
    troco,
    parcelas,
    setParcelas,
    valoresPredefinidos
  };
} 