import React from 'react';
import Select from 'react-select';
import type { ProdutoOption } from '../types';
import Button from '../../shared/components/ui/Button';
import { ShoppingBagOpen, Scales, Plus, MagnifyingGlass } from 'phosphor-react';

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

const customSelectStyles = {
  control: (base: any) => ({
    ...base,
    borderRadius: '0.5rem',
    borderColor: '#EAECEE',
    minHeight: '42px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#2ECC71',
    },
    '&:focus-within': {
      borderColor: '#2ECC71',
      boxShadow: '0 0 0 2px #EAF9F1',
    },
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected 
      ? '#2ECC71' 
      : state.isFocused 
        ? '#EAF9F1' 
        : undefined,
    color: state.isSelected ? 'white' : '#2C3E50',
    '&:hover': {
      backgroundColor: state.isSelected ? '#28B463' : '#EAF9F1',
    }
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#BDC3C7',
  }),
};

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
  <div className="space-y-4">
    <div>
      <label className="block text-label font-medium text-text-primary mb-2">
        Selecionar Produto:
      </label>
      <div className="relative">
        <Select
          options={produtoOptions}
          value={selectedProduto}
          onChange={handleProdutoChange}
          placeholder="Busque por nome do produto..."
          className="w-full"
          classNamePrefix="select"
          noOptionsMessage={() => "Nenhum produto encontrado"}
          styles={customSelectStyles}
          formatOptionLabel={(option) => (
            <div className="flex items-center gap-2">
              <ShoppingBagOpen size={16} className="text-primary" />
              <div>
                <div className="font-medium">{option.label}</div>
                <div className="text-xs text-text-secondary">
                  {option.produto.tipo === 'peso' ? 'Por Kg' : 'Por Unidade'} - R$ {Number(option.produto.preco).toFixed(2)}
                </div>
              </div>
            </div>
          )}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
          <MagnifyingGlass size={16} />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
      <div className="sm:col-span-3">
        <label className="block text-label font-medium text-text-primary mb-2">
          {selectedProduto?.produto.tipo === 'peso' ? 'Peso (kg):' : 'Quantidade:'}
        </label>
        <input
          type="number"
          step={selectedProduto?.produto.tipo === 'peso' ? "0.001" : "1"}
          value={pesoOuQuantidade}
          onChange={(e) => setPesoOuQuantidade(e.target.value)}
          id="pesoOuQuantidade"
          className="block w-full rounded-md border border-border bg-background-component placeholder-text-disabled text-text-primary p-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
          placeholder={selectedProduto?.produto.tipo === 'peso' ? "Digite o peso em kg" : "Digite a quantidade"}
        />
      </div>
      <div className="sm:col-span-2 flex items-end">
        <Button
          variant="secondary"
          onClick={lerPesoBalanca}
          leftIcon={<Scales size={16} />}
          fullWidth
          disabled={!selectedProduto || selectedProduto?.produto.tipo !== 'peso'}
          title={!selectedProduto || selectedProduto?.produto.tipo !== 'peso' ? "Disponível apenas para produtos pesados" : "Ler peso da balança"}
        >
          Ler Balança
        </Button>
      </div>
    </div>

    <Button
      variant="primary"
      onClick={adicionarAoCarrinho}
      leftIcon={<Plus size={16} />}
      fullWidth
      disabled={!selectedProduto || !pesoOuQuantidade || parseFloat(pesoOuQuantidade) <= 0}
    >
      Adicionar ao Carrinho
    </Button>
  </div>
);

export default FormularioProduto; 