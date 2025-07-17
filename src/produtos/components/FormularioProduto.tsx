import React from 'react';

interface FormularioProdutoProps {
  nome: string;
  setNome: (v: string) => void;
  preco: string;
  setPreco: (v: string) => void;
  tipo: 'peso' | 'fixo';
  setTipo: (v: 'peso' | 'fixo') => void;
  onSubmit: () => void;
  editandoId: string | null;
  estoque?: number;
  ativo?: boolean;
}

const FormularioProduto: React.FC<FormularioProdutoProps> = ({ nome, setNome, preco, setPreco, tipo, setTipo, onSubmit, editandoId, estoque, ativo }) => {
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
      {typeof estoque === 'number' && (
        <div>
          <label>Estoque:</label>
          <input value={estoque} readOnly />
        </div>
      )}
      {typeof ativo === 'boolean' && (
        <div>
          <label>Status:</label>
          <input value={ativo ? 'Ativo' : 'Inativo'} readOnly />
        </div>
      )}
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
};

export default FormularioProduto; 