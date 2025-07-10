import React from 'react';
import type { Produto } from '../types';

interface TabelaProdutosProps {
  produtos: Produto[];
  filtro: string;
  setFiltro: (v: string) => void;
  editarProduto: (produto: Produto) => void;
  setModalExcluir: (id: string) => void;
  page: number;
  setPage: (p: number) => void;
  total: number;
  totalPages: number;
}

const TabelaProdutos: React.FC<TabelaProdutosProps> = ({ produtos, filtro, setFiltro, editarProduto, setModalExcluir, page, setPage, total, totalPages }) => (
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
            .filter((p) => p.nome.toLowerCase().includes(filtro.toLowerCase()))
            .map((p) => (
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
    <div className="flex justify-between items-center mt-4">
      <span className="text-sm text-gray-600">Página {page} de {totalPages} ({total} produtos)</span>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >Anterior</button>
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >Próxima</button>
      </div>
    </div>
  </div>
);

export default TabelaProdutos; 