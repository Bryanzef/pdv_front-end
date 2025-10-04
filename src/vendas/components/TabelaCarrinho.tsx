import React from 'react';
import type { ItemCarrinho } from '../types';
import { NotePencil, Trash, Warning } from 'phosphor-react';
import Button from '../../shared/components/ui/Button';

interface TabelaCarrinhoProps {
  carrinho: ItemCarrinho[];
  abrirModalEditar: (index: number) => void;
  removerItem: (index: number) => void;
}

const TabelaCarrinho: React.FC<TabelaCarrinhoProps> = ({ carrinho, abrirModalEditar, removerItem }) => {
  if (carrinho.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 text-text-secondary">
        <div className="w-16 h-16 rounded-full bg-background-app flex items-center justify-center mb-3">
          <Warning size={24} className="text-text-secondary" />
        </div>
        <p className="text-lg font-medium">Carrinho vazio</p>
        <p className="text-sm mt-1">Adicione produtos para iniciar uma venda</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-background-app text-text-primary border-b border-border">
            <th className="p-3 text-left text-sm font-medium uppercase">Produto</th>
            <th className="p-3 text-right text-sm font-medium uppercase">Qtd</th>
            <th className="p-3 text-right text-sm font-medium uppercase">Preço</th>
            <th className="p-3 text-right text-sm font-medium uppercase">Subtotal</th>
            <th className="p-3 text-center text-sm font-medium uppercase">Ações</th>
          </tr>
        </thead>
        <tbody>
          {carrinho.map((item, index) => (
            <tr key={index} className="border-b border-border hover:bg-primary-soft">
              <td className="p-3 font-medium">
                <div>
                  {item.nome}
                </div>
                {item.precoOriginal && item.preco !== item.precoOriginal && (
                  <div className="text-xs text-warning mt-1 flex items-center gap-1">
                    <Warning size={14} />
                    Preço alterado
                  </div>
                )}
              </td>
              <td className="p-3 text-right">
                <span className="font-medium">{item.quantidade}</span>
                <span className="text-text-secondary ml-1">{item.tipo === 'peso' ? 'kg' : 'un'}</span>
              </td>
              <td className="p-3 text-right whitespace-nowrap">
                <div className="font-medium">R$ {item.preco.toFixed(2)}</div>
                {item.precoOriginal && item.preco !== item.precoOriginal && (
                  <div className="text-xs text-text-secondary line-through">
                    R$ {item.precoOriginal.toFixed(2)}
                  </div>
                )}
              </td>
              <td className="p-3 text-right font-medium">R$ {item.subtotal.toFixed(2)}</td>
              <td className="p-3 flex gap-1 justify-center">
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => abrirModalEditar(index)}
                  title="Editar item"
                  className="text-text-secondary hover:text-primary"
                >
                  <NotePencil size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => removerItem(index)}
                  title="Remover item"
                  className="text-text-secondary hover:text-danger"
                >
                  <Trash size={18} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaCarrinho; 