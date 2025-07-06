import { useState, useEffect } from 'react';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import Modal from './Modal';

interface Produto {
  _id: string;
  nome: string;
  preco: number;
  tipo: 'peso' | 'fixo';
  imagem: string;
}

function ProdutoForm({ nome, setNome, preco, setPreco, tipo, setTipo, onSubmit, editandoId }: any) {
  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
      <div>
        <label className="block mb-2 font-medium">Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
          placeholder="Digite o nome do produto"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">Preço:</label>
        <input
          type="number"
          step="0.01"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
          placeholder="Digite o preço"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">Tipo:</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as 'peso' | 'fixo')}
          className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
        >
          <option value="peso">Por peso (kg)</option>
          <option value="fixo">Por unidade</option>
        </select>
      </div>
      <div className="sm:col-span-2 md:col-span-3 flex gap-2 mt-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors font-semibold shadow"
        >
          <i className="fas fa-save mr-2"></i>{editandoId ? 'Atualizar Produto' : 'Cadastrar Produto'}
        </button>
      </div>
    </form>
  );
}

function TabelaProdutos({ produtos, filtro, setFiltro, editarProduto, setModalExcluir }: any) {
  return (
    <div>
      <h2 className="text-xl font-bold mt-6 mb-2">Lista de Produtos</h2>
      <input
        type="text"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="border p-2 w-full rounded mb-4 focus:ring-2 focus:ring-green-400"
        placeholder="Filtrar por nome..."
      />
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-100 text-green-900">
              <th className="border p-2">Nome</th>
              <th className="border p-2">Preço</th>
              <th className="border p-2">Tipo</th>
              <th className="border p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos
              .filter((p: Produto) => p.nome.toLowerCase().includes(filtro.toLowerCase()))
              .map((p: Produto) => (
                <tr key={p._id} className="hover:bg-green-50">
                  <td className="border p-2">{p.nome}</td>
                  <td className="border p-2">R$ {p.preco.toFixed(2)}</td>
                  <td className="border p-2">{p.tipo === 'peso' ? 'Por peso (kg)' : 'Por unidade'}</td>
                  <td className="border p-2 flex gap-2 justify-center">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                      onClick={() => editarProduto(p)}
                      title="Editar"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                      onClick={() => setModalExcluir(p._id)}
                      title="Excluir"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nome, setNome] = useState<string>('');
  const [preco, setPreco] = useState<string>('');
  const [tipo, setTipo] = useState<'peso' | 'fixo'>('peso');
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [modalExcluir, setModalExcluir] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/produtos`)
      .then((res: AxiosResponse<Produto[]>) => setProdutos(res.data))
      .catch(() => setFeedback('Erro ao carregar produtos'));
  }, []);

  const cadastrarOuAtualizar = async () => {
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
        await axios.put(`${import.meta.env.VITE_API_URL}/produtos/${editandoId}`, { nome, preco: parseFloat(preco), tipo });
        setFeedback('Produto atualizado com sucesso.');
        setEditandoId(null);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/produtos`, { nome, preco: parseFloat(preco), tipo });
        setFeedback('Produto cadastrado com sucesso.');
      }
      setNome('');
      setPreco('');
      setTipo('peso');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/produtos`);
      setProdutos(res.data);
    } catch (err: any) {
      setFeedback(err.response?.data?.error || 'Erro ao salvar produto');
    }
  };

  const editarProduto = (produto: Produto) => {
    setNome(produto.nome);
    setPreco(produto.preco.toString());
    setTipo(produto.tipo);
    setEditandoId(produto._id);
    setFeedback('');
  };

  const excluirProduto = async () => {
    if (!modalExcluir) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/produtos/${modalExcluir}`);
      setProdutos(produtos.filter(p => p._id !== modalExcluir));
      setModalExcluir(null);
      setFeedback('Produto excluído com sucesso.');
    } catch (err) {
      setFeedback('Erro ao excluir produto');
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-900 flex items-center gap-2">
        <span>📦</span> Gerenciar Produtos
      </h2>
      <ProdutoForm
        nome={nome}
        setNome={setNome}
        preco={preco}
        setPreco={setPreco}
        tipo={tipo}
        setTipo={setTipo}
        onSubmit={cadastrarOuAtualizar}
        editandoId={editandoId}
      />
      {feedback && (
        <div className={`my-2 p-2 rounded text-center font-medium ${feedback.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {feedback}
        </div>
      )}
      <TabelaProdutos
        produtos={produtos}
        filtro={filtro}
        setFiltro={setFiltro}
        editarProduto={editarProduto}
        setModalExcluir={setModalExcluir}
      />
      <Modal
        isOpen={modalExcluir !== null}
        onClose={() => setModalExcluir(null)}
        title="Excluir Produto"
        content="Deseja excluir este produto?"
        onConfirm={excluirProduto}
      />
    </div>
  );
};

export default Produtos;