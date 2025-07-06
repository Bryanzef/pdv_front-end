import React from 'react';
import Modal from '../shared/Modal';
import { useVendas } from './hooks/useVendas';
import FormularioProduto from './components/FormularioProduto';
import TabelaCarrinho from './components/TabelaCarrinho';

const Vendas: React.FC = () => {
  const {
    carrinho,
    total,
    pesoOuQuantidade,
    selectedProduto,
    feedback,
    modalOpen,
    editItem,
    produtoOptions,
    setPesoOuQuantidade,
    handleProdutoChange,
    lerPesoBalanca,
    adicionarAoCarrinho,
    abrirModalEditar,
    salvarEdicao,
    removerItem,
    finalizarVenda,
    cancelarVenda
  } = useVendas();

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-900 flex items-center gap-2">
        <span>🍉</span> Registrar Venda
      </h2>
      <FormularioProduto
        produtoOptions={produtoOptions}
        selectedProduto={selectedProduto}
        handleProdutoChange={handleProdutoChange}
        pesoOuQuantidade={pesoOuQuantidade}
        setPesoOuQuantidade={setPesoOuQuantidade}
        feedback={feedback}
        lerPesoBalanca={lerPesoBalanca}
        adicionarAoCarrinho={adicionarAoCarrinho}
      />
      <h2 className="text-xl font-bold mt-6 mb-2">Carrinho</h2>
      <TabelaCarrinho
        carrinho={carrinho}
        abrirModalEditar={abrirModalEditar}
        removerItem={removerItem}
      />
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold">Total: R$ {total.toFixed(2)}</span>
        <div className="flex gap-2">
          <button
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors font-semibold shadow"
            onClick={finalizarVenda}
          >
            <i className="fas fa-check mr-2"></i>Finalizar Venda
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors font-semibold shadow"
            onClick={cancelarVenda}
          >
            <i className="fas fa-times mr-2"></i>Cancelar
          </button>
        </div>
      </div>
      {modalOpen === 'editar' && editItem && (
        <Modal
          isOpen={modalOpen === 'editar'}
          onClose={() => setModalOpen(null)}
          title="Editar Item"
          content={
            <div>
              <label>Quantidade:</label>
              <input
                id="editarQuantidade"
                type="number"
                defaultValue={editItem.quantidade}
                className="border p-2 w-full rounded mb-2"
              />
              <label>Preço:</label>
              <input
                id="editarPreco"
                type="number"
                defaultValue={editItem.preco}
                className="border p-2 w-full rounded mb-2"
              />
              <label>Justificativa (se alterar preço):</label>
              <input
                id="justificativaPreco"
                type="text"
                defaultValue={editItem.justificativa || ''}
                className="border p-2 w-full rounded mb-2"
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
                onClick={() => {
                  const quantidade = parseFloat((document.getElementById('editarQuantidade') as HTMLInputElement).value);
                  const preco = parseFloat((document.getElementById('editarPreco') as HTMLInputElement).value);
                  const justificativa = (document.getElementById('justificativaPreco') as HTMLInputElement).value;
                  salvarEdicao(quantidade, preco, justificativa);
                }}
              >Salvar</button>
            </div>
          }
          onConfirm={() => {}}
        />
      )}
      {feedback && (
        <div className={`my-2 p-2 rounded text-center font-medium ${feedback.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {feedback}
        </div>
      )}
    </div>
  );
};

export default Vendas;