import React from 'react';
import type { Venda } from '../../vendas/types';

interface TabelaHistoricoProps {
  vendas: Venda[];
  setModalExcluir: (id: string) => void;
}

const TabelaHistorico: React.FC<TabelaHistoricoProps> = ({ vendas, setModalExcluir }) => (
  <div className="overflow-x-auto rounded-lg shadow">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-green-100 text-green-900">
          <th className="border p-2">Data</th>
          <th className="border p-2">Total</th>
          <th className="border p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {vendas.map(v => (
          <tr key={v._id} className="hover:bg-green-50">
            <td className="border p-2">{new Date(v.data).toLocaleString('pt-BR')}</td>
            <td className="border p-2">R$ {v.total.toFixed(2)}</td>
            <td className="border p-2 flex gap-2 justify-center">
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                onClick={() => window.open(`/vendas/${v._id}/pdf`, '_blank')}
                title="Visualizar PDF"
              >
                <i className="fas fa-eye"></i>
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                onClick={() => setModalExcluir(v._id)}
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
);

export default TabelaHistorico; 