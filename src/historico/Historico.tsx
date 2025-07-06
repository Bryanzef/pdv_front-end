import React from 'react';
import Modal from '../shared/Modal';
import { useHistorico } from './hooks/useHistorico';
import TabelaHistorico from './components/TabelaHistorico';

const Historico: React.FC = () => {
  const {
    vendas,
    modalExcluir,
    setModalExcluir,
    feedback,
    excluirVenda
  } = useHistorico();

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-900 flex items-center gap-2">
        <span>📈</span> Histórico de Vendas
      </h2>
      {feedback && (
        <div className={`my-2 p-2 rounded text-center font-medium ${feedback.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {feedback}
        </div>
      )}
      <TabelaHistorico vendas={vendas} setModalExcluir={setModalExcluir} />
      <Modal
        isOpen={modalExcluir !== null}
        onClose={() => setModalExcluir(null)}
        title="Excluir Venda"
        content="Deseja excluir esta venda?"
        onConfirm={excluirVenda}
      />
    </div>
  );
};

export default Historico; 