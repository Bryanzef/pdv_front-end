import React from 'react';
import Select from 'react-select';
import type { ProdutoOption } from '../types';

interface FormularioProdutoProps {
  produtoOptions: ProdutoOption[];
  selectedProduto: ProdutoOption | null;
  handleProdutoChange: (option: ProdutoOption | null) => void;
  pesoOuQuantidade: string;
  setPesoOuQuantidade: (value: string) => void;
  feedback: string;
  lerPesoBalanca: () => void;
  adicionarAoCarrinho: () => void;
}

const FormularioProduto: React.FC<FormularioProdutoProps> = ({
  produtoOptions,
  selectedProduto,
  handleProdutoChange,
  pesoOuQuantidade,
  setPesoOuQuantidade,
  feedback,
  lerPesoBalanca,
  adicionarAoCarrinho
}) => (
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
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
      <div className="flex items-end">
        <button
          className="bg-green-600 text-white p-2 rounded w-full hover:bg-green-700 transition-colors font-semibold shadow"
          onClick={adicionarAoCarrinho}
        >
          <i className="fas fa-plus mr-2"></i>Adicionar ao Carrinho
        </button>
      </div>
    </div>
  </div>
);

export default FormularioProduto; 