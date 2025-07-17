import React from 'react';
import Modal from '../shared/Modal';
import FormularioProduto from './components/FormularioProduto';
import TabelaProdutos from './components/TabelaProdutos';
import { useProdutos } from './hooks/useProdutos';

const Produtos: React.FC = () => {
  const {
    produtos,
    nome,
    setNome,
    preco,
    setPreco,
    tipo,
    setTipo,
    editandoId,
    filtro,
    setFiltro,
    feedback,
    modalExcluir,
    setModalExcluir,
    cadastrarOuAtualizar,
    editarProduto,
    excluirProduto,
    page,
    setPage,
    total,
    totalPages
  } = useProdutos();

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-900 flex items-center gap-2">
        <span>📦</span> Gerenciar Produtos
      </h2>
      <FormularioProduto
        nome={nome}
        setNome={setNome}
        preco={preco}
        setPreco={setPreco}
        tipo={tipo}
        setTipo={setTipo}
        onSubmit={cadastrarOuAtualizar}
        editandoId={editandoId}
        estoque={editandoId ? produtos.find(p => p._id === editandoId)?.estoque : undefined}
        ativo={editandoId ? produtos.find(p => p._id === editandoId)?.ativo : undefined}
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
        page={page}
        setPage={setPage}
        total={total}
        totalPages={totalPages}
      />
      <Modal
        isOpen={modalExcluir !== null}
        onClose={() => setModalExcluir(null)}
        title="Excluir Produto"
        content={
          <div>
            <p>Deseja excluir este produto?</p>
            <div className="flex gap-2 mt-4 justify-end">
              <button onClick={() => setModalExcluir(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancelar</button>
              <button onClick={excluirProduto} className="bg-red-600 text-white px-4 py-2 rounded">Excluir</button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Produtos;