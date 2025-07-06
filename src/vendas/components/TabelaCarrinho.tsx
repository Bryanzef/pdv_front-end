import React from 'react';
import type { ItemCarrinho } from '../types';

interface TabelaCarrinhoProps {
  carrinho: ItemCarrinho[];
  abrirModalEditar: (index: number) => void;
  removerItem: (index: number) => void;
}

const TabelaCarrinho: React.FC<TabelaCarrinhoProps> = ({ carrinho, abrirModalEditar, removerItem }) => (
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
);

export default TabelaCarrinho; 