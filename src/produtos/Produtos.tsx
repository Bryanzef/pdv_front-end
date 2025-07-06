import React from 'react';
import Modal from '../shared/Modal';
import { useProdutos } from './hooks/useProdutos';
import FormularioProduto from './components/FormularioProduto';
import TabelaProdutos from './components/TabelaProdutos';

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
    excluirProduto
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