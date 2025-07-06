import { useState, useEffect } from 'react';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { jsPDF } from 'jspdf';
import Select from 'react-select';
import type { SingleValue } from 'react-select';
import Modal from './Modal';

interface Produto {
  _id: string;
  nome: string;
  preco: number;
  tipo: 'peso' | 'fixo';
  imagem: string;
}

interface ItemCarrinho extends Produto {
  quantidade: number;
  subtotal: number;
  precoOriginal: number;
  justificativa?: string;
}

interface ProdutoOption {
  value: string;
  label: string;
  produto: Produto;
}

declare global {
  interface ImportMeta {
    env: {
      VITE_API_URL: string;
      [key: string]: any;
    };
  }
}

const Vendas: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pesoOuQuantidade, setPesoOuQuantidade] = useState<string>('');
  const [selectedProduto, setSelectedProduto] = useState<SingleValue<ProdutoOption> | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<ItemCarrinho & { index: number } | null>(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/produtos`)
      .then((res: AxiosResponse<Produto[]>) => setProdutos(res.data))
      .catch(() => setFeedback('Erro ao carregar produtos'));
  }, []);

  const produtoOptions: ProdutoOption[] = produtos.map(p => ({
    value: p.nome,
    label: `${p.imagem} ${p.nome} - R$ ${p.preco.toFixed(2)} (${p.tipo === 'peso' ? 'kg' : 'un'})`,
    produto: p
  }));

  const handleProdutoChange = (selectedOption: SingleValue<ProdutoOption>) => {
    setSelectedProduto(selectedOption);
    setPesoOuQuantidade('');
    setFeedback('');
    document.getElementById('pesoOuQuantidade')?.focus();
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
    const subtotal = produto.tipo === 'peso' ? produto.preco * quantidade : produto.preco * quantidade;
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

  const salvarEdicao = () => {
    if (!editItem) return;
    const quantidadeInput = document.getElementById('editarQuantidade') as HTMLInputElement;
    const precoInput = document.getElementById('editarPreco') as HTMLInputElement;
    const justificativaInput = document.getElementById('justificativaPreco') as HTMLInputElement;

    const quantidade = parseFloat(quantidadeInput.value);
    const preco = parseFloat(precoInput.value);
    const justificativa = justificativaInput.value;

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
    item.subtotal = item.tipo === 'peso' ? preco * quantidade : preco * quantidade;
    if (preco !== item.precoOriginal) item.justificativa = justificativa;
    else delete item.justificativa;
    setCarrinho(novosItens);
    setTotal(total - subtotalAnterior + item.subtotal);
    setModalOpen(null);
    setFeedback('Item editado com sucesso.');
  };

  const removerItem = (index: number) => {
    if (!window.confirm('Deseja remover este item do carrinho?')) return;
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
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Fruteira do Zé - Documento Não Fiscal', 20, 20);
    doc.setFontSize(12);
    doc.text(`Data: ${new Date().toLocaleString('pt-BR')}`, 20, 30);
    doc.text('---------------------------------------------', 20, 40);
    let y = 50;
    carrinho.forEach((item, index) => {
      const linha = `${index + 1}. ${item.nome} - ${item.quantidade} ${item.tipo === 'peso' ? 'kg' : 'un'} x R$ ${item.preco.toFixed(2)} = R$ ${item.subtotal.toFixed(2)}`;
      doc.text(linha, 20, y);
      if (item.justificativa) {
        doc.text(`   * Justificativa: ${item.justificativa}`, 20, y + 5);
        y += 5;
      }
      y += 10;
    });
    doc.text('---------------------------------------------', 20, y);
    doc.text(`Total: R$ ${total.toFixed(2)}`, 20, y + 10);
    doc.save('documento_nao_fiscal.pdf');

    await axios.post(`${import.meta.env.VITE_API_URL}/vendas`, { itens: carrinho, total });
    setCarrinho([]);
    setTotal(0);
    setModalOpen(null);
    setFeedback('Venda finalizada com sucesso!');
  };

  const cancelarVenda = () => {
    if (carrinho.length === 0) {
      setFeedback('O carrinho está vazio.');
      return;
    }
    setCarrinho([]);
    setTotal(0);
    setModalOpen(null);
    setFeedback('Venda cancelada.');
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-900 flex items-center gap-2">
        <span>🍉</span> Registrar Venda
      </h2>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Selecionar Produto:</label>
        <Select
          options={produtoOptions}
          value={selectedProduto}
          onChange={handleProdutoChange}
          placeholder="Busque por nome do produto..."
          className="w-full"
          classNamePrefix="select"
          noOptionsMessage={() => "Nenhum produto encontrado"}
        />
        {feedback.includes('Selecione') && <p className="text-red-600 mt-2">{feedback}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">Peso/Quantidade:</label>
          <input
            type="number"
            step="0.001"
            value={pesoOuQuantidade}
            onChange={(e) => setPesoOuQuantidade(e.target.value)}
            id="pesoOuQuantidade"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
            placeholder="Digite o peso (kg) ou quantidade"
          />
          {feedback.includes('Peso/quantidade') && <p className="text-red-600 mt-2">{feedback}</p>}
          <button
            className="mt-2 bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition-colors font-semibold shadow"
            onClick={lerPesoBalanca}
          >
            <i className="fas fa-weight-scale mr-2"></i>Ler Peso da Balança
          </button>
        </div>
        <div>
          <button
            className="mt-6 bg-green-600 text-white p-2 rounded w-full hover:bg-green-700 transition-colors font-semibold shadow"
            onClick={adicionarAoCarrinho}
          >
            <i className="fas fa-plus mr-2"></i>Adicionar ao Carrinho
          </button>
        </div>
      </div>
      <h2 className="text-xl font-bold mt-6 mb-2">Carrinho</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-100 text-green-900">
              <th className="border p-2">Produto</th>
              <th className="border p-2">Quantidade</th>
              <th className="border p-2">Preço</th>
              <th className="border p-2">Subtotal</th>
              <th className="border p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {carrinho.map((item, index) => (
              <tr key={index} className="hover:bg-green-50">
                <td className="border p-2">{item.nome}</td>
                <td className="border p-2">{item.quantidade} {item.tipo === 'peso' ? 'kg' : 'un'}</td>
                <td className="border p-2">
                  R$ {item.preco.toFixed(2)}
                  {item.precoOriginal && item.preco !== item.precoOriginal && (
                    <span className="text-xs text-yellow-700 ml-1">(Original: R$ {item.precoOriginal.toFixed(2)})</span>
                  )}
                </td>
                <td className="border p-2">R$ {item.subtotal.toFixed(2)}</td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                    onClick={() => abrirModalEditar(index)}
                    title="Editar"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                    onClick={() => removerItem(index)}
                    title="Remover"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-6 justify-end items-center">
        <div className="text-xl font-bold text-green-900">Total: R$ {total.toFixed(2)}</div>
        <button
          className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition-colors font-semibold shadow"
          onClick={finalizarVenda}
        >
          <i className="fas fa-check mr-2"></i>Finalizar Venda
        </button>
        <button
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors font-semibold shadow"
          onClick={cancelarVenda}
        >
          <i className="fas fa-times mr-2"></i>Cancelar Venda
        </button>
      </div>
      <Modal
        isOpen={modalOpen === 'editar'}
        onClose={() => setModalOpen(null)}
        title="Editar Item"
        content={editItem && (
          <div className="space-y-2">
            <label className="block font-medium">Quantidade:</label>
            <input
              id="editarQuantidade"
              type="number"
              step="0.001"
              defaultValue={editItem.quantidade}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
            />
            <label className="block font-medium">Preço:</label>
            <input
              id="editarPreco"
              type="number"
              step="0.01"
              defaultValue={editItem.preco}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
            />
            <label className="block font-medium">Justificativa (se alterar preço):</label>
            <input
              id="justificativaPreco"
              type="text"
              defaultValue={editItem.justificativa || ''}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
            />
          </div>
        )}
        onConfirm={salvarEdicao}
      />
    </div>
  );
};

export default Vendas;