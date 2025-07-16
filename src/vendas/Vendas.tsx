import React from 'react';
import Modal from '../shared/Modal';
import FormaPagamento from './components/FormaPagamento';
import FormularioProduto from './components/FormularioProduto';
import ResumoVenda from './components/ResumoVenda';
import TabelaCarrinho from './components/TabelaCarrinho';
import { useVendas } from './hooks/useVendas';

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
    cancelarVenda,
    setModalOpen,
    // Pagamento
    formaPagamento,
    setFormaPagamento,
    valorPago,
    setValorPago,
    troco,
    parcelas,
    setParcelas,
    valoresPredefinidos
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
      <FormaPagamento
        formaPagamento={formaPagamento}
        setFormaPagamento={setFormaPagamento}
        valorPago={valorPago}
        setValorPago={setValorPago}
        troco={troco}
        parcelas={parcelas}
        setParcelas={setParcelas}
        total={total}
        valoresPredefinidos={valoresPredefinidos}
      />
      <ResumoVenda
        quantidadeTotal={carrinho.reduce((acc, item) => acc + item.quantidade, 0)}
        subtotal={carrinho.reduce((acc, item) => acc + item.subtotal, 0)}
        desconto={0}
        total={total}
        formaPagamento={formaPagamento}
        troco={troco}
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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-semibold shadow"
            onClick={() => {
              import('./utils/pdfHelpers').then(({ gerarPdfVenda }) => {
                gerarPdfVenda(carrinho, total);
              });
            }}
          >
            <i className="fas fa-print mr-2"></i>Imprimir Cupom
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
            <form
              onSubmit={e => {
                e.preventDefault();
                const quantidade = parseFloat((document.getElementById('editarQuantidade') as HTMLInputElement).value);
                const preco = parseFloat((document.getElementById('editarPreco') as HTMLInputElement).value);
                const justificativa = (document.getElementById('justificativaPreco') as HTMLInputElement).value;
                salvarEdicao(quantidade, preco, justificativa);
                setModalOpen(null);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block mb-1 font-medium">Quantidade:</label>
                <input
                  id="editarQuantidade"
                  type="number"
                  step="any"
                  min="0.001"
                  defaultValue={editItem.quantidade}
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400 dark:bg-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Preço:</label>
                <input
                  id="editarPreco"
                  type="number"
                  step="any"
                  min="0.01"
                  defaultValue={editItem.preco}
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400 dark:bg-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Justificativa (se alterar preço):</label>
                <input
                  id="justificativaPreco"
                  type="text"
                  defaultValue={editItem.justificativa || ''}
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="flex gap-2 justify-end mt-4">
                <button
                  type="button"
                  className="bg-gray-400 dark:bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-500 dark:hover:bg-gray-600"
                  onClick={() => setModalOpen(null)}
                >Cancelar</button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >Salvar</button>
              </div>
            </form>
          }
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