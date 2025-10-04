import React, { useState } from 'react';
import Modal from '../shared/Modal';
import FormaPagamento from './components/FormaPagamento';
import FormularioProduto from './components/FormularioProduto';
import ResumoVenda from './components/ResumoVenda';
import TabelaCarrinho from './components/TabelaCarrinho';
import ErrorHandler from './components/ErrorHandler';
import { useVendas } from './hooks/useVendas';
import Card from '../shared/components/ui/Card';
import Button from '../shared/components/ui/Button';
import { ShoppingCart, Printer, X, CheckCircle, CaretUp, Receipt, CircleNotch } from 'phosphor-react';

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
    carregando,
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
    setFeedback,
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

  // Estados para controle da UI
  const [modalImprimir, setModalImprimir] = useState(false);
  const [detalhesAbertos, setDetalhesAbertos] = useState(false);
  
  // Estado para controle de etapa (cadastro de produtos ou pagamento)
  const [etapaAtual, setEtapaAtual] = useState<'produtos' | 'pagamento'>('produtos');

  // Handler para finalizar venda com ou sem impressão
  const handleFinalizarVenda = async (deveImprimir: boolean) => {
    await finalizarVenda(deveImprimir);
    // Voltamos à etapa de produtos após finalização com sucesso
    if (!feedback || feedback.includes('sucesso')) {
      setEtapaAtual('produtos');
    }
  };

  const handleImprimirCupom = () => {
    import('./utils/pdfHelpers').then(({ gerarPdfVenda }) => {
      gerarPdfVenda(carrinho, total);
    });
  };
  
  const handleAvancarParaPagamento = () => {
    if (carrinho.length > 0) {
      setEtapaAtual('pagamento');
    } else {
      setFeedback('O carrinho está vazio.');
    }
  };

  const handleVoltarParaProdutos = () => {
    setEtapaAtual('produtos');
  };

  // Limpa mensagens de feedback
  const clearFeedback = () => setFeedback('');

  // Overlay de carregamento
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-background-component p-5 rounded-lg shadow-lg flex flex-col items-center">
        <CircleNotch size={40} className="text-primary animate-spin" />
        <p className="mt-3 font-medium">Processando...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 pb-24 md:pb-28"> {/* Padding na parte inferior para a barra fixa */}
      {/* Loading overlay */}
      {carregando && <LoadingOverlay />}

      <div className="flex items-center justify-between">
        <h1 className="text-h1 font-bold text-text-primary">Registrar Venda</h1>
        
        {/* Indicador de progresso */}
        <div className="hidden md:flex items-center gap-2 bg-background-app p-1 rounded-full">
          <Button 
            variant={etapaAtual === 'produtos' ? 'primary' : 'ghost'}
            size="sm"
            className="rounded-full"
            onClick={handleVoltarParaProdutos}
          >
            1. Produtos
          </Button>
          <Button 
            variant={etapaAtual === 'pagamento' ? 'primary' : 'ghost'}
            size="sm"
            className="rounded-full"
            onClick={handleAvancarParaPagamento}
            disabled={carrinho.length === 0}
          >
            2. Pagamento
          </Button>
        </div>
      </div>

      {/* Etapa 1: Seleção de Produtos */}
      {etapaAtual === 'produtos' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna 1: Formulário de Produtos */}
          <div className="lg:col-span-1">
            <Card>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">Adicionar Produto</h2>
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
            </Card>
          </div>
          
          {/* Coluna 2: Carrinho e Resumo */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Tabela do carrinho */}
              <Card>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-h3 font-semibold text-text-primary">Carrinho</h2>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={cancelarVenda}
                      leftIcon={<X size={16} />}
                      className="text-danger hover:bg-danger/10"
                      disabled={carrinho.length === 0 || carregando}
                    >
                      Limpar
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleAvancarParaPagamento}
                      disabled={carrinho.length === 0 || carregando}
                    >
                      Avançar
                    </Button>
                  </div>
                </div>

                <div className="h-[calc(100vh-320px)] overflow-y-auto">
                  <TabelaCarrinho
                    carrinho={carrinho}
                    abrirModalEditar={abrirModalEditar}
                    removerItem={removerItem}
                  />
                </div>
                
                {carrinho.length > 0 && (
                  <div className="mt-4 flex justify-between items-center pt-4 border-t border-border">
                    <div>
                      <p className="text-text-secondary text-sm">Total de itens: {carrinho.reduce((acc, item) => acc + item.quantidade, 0)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-text-secondary">Total:</p>
                      <p className="text-xl font-bold text-primary">R$ {total.toFixed(2)}</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      )}
      
      {/* Etapa 2: Pagamento */}
      {etapaAtual === 'pagamento' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna 1: Forma de pagamento */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-h3 font-semibold text-text-primary">Forma de Pagamento</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleVoltarParaProdutos}
                  leftIcon={<CaretUp className="rotate-90" size={16} />}
                  disabled={carregando}
                >
                  Voltar
                </Button>
              </div>
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
            </Card>
          </div>
          
          {/* Coluna 2: Resumo da venda */}
          <div className="lg:col-span-1">
            <Card variant="outlined" className="sticky top-4">
              <h2 className="text-h3 font-semibold text-text-primary mb-4">Resumo da Venda</h2>
              <ResumoVenda
                quantidadeTotal={carrinho.reduce((acc, item) => acc + item.quantidade, 0)}
                subtotal={carrinho.reduce((acc, item) => acc + item.subtotal, 0)}
                desconto={0}
                total={total}
                formaPagamento={formaPagamento}
                troco={troco}
              />
              
              <div className="mt-6 space-y-3">
                <Button
                  variant="primary"
                  fullWidth
                  disabled={!formaPagamento || carregando}
                  onClick={() => setModalImprimir(true)}
                  leftIcon={<CheckCircle size={18} />}
                >
                  Finalizar Venda
                </Button>
                
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={handleImprimirCupom}
                  leftIcon={<Printer size={18} />}
                  disabled={carregando}
                >
                  Imprimir Cupom
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Componente de tratamento de erros */}
      <ErrorHandler feedback={feedback} clearFeedback={clearFeedback} />

      {/* Barra de ações fixa na parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-background-component border-t border-border shadow-lg z-30 p-2 md:p-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          {/* Lado esquerdo - Resumo compacto e detalhes */}
          <div className="relative w-full sm:w-auto">
            <div className="flex items-start sm:items-center">
              <Button 
                variant="ghost"
                size="sm"
                className={`${detalhesAbertos ? 'rotate-180' : ''} transition-transform mt-1`}
                onClick={() => setDetalhesAbertos(!detalhesAbertos)}
                title={detalhesAbertos ? "Fechar detalhes" : "Ver detalhes"}
                disabled={carregando}
              >
                <CaretUp size={16} />
              </Button>
              <div className="flex-1 sm:flex-none ml-2 w-full sm:w-auto">
                <ResumoVenda
                  quantidadeTotal={carrinho.reduce((acc, item) => acc + item.quantidade, 0)}
                  subtotal={carrinho.reduce((acc, item) => acc + item.subtotal, 0)}
                  desconto={0}
                  total={total}
                  formaPagamento={formaPagamento}
                  troco={troco}
                  compacto={true}
                />
              </div>
            </div>
            
            {/* Painel de detalhes expandível */}
            {detalhesAbertos && (
              <div className="absolute bottom-full left-0 mb-2 bg-background-component rounded-lg shadow-lg border border-border p-4 w-[calc(100vw-2rem)] sm:w-80 z-40">
                <ResumoVenda
                  quantidadeTotal={carrinho.reduce((acc, item) => acc + item.quantidade, 0)}
                  subtotal={carrinho.reduce((acc, item) => acc + item.subtotal, 0)}
                  desconto={0}
                  total={total}
                  formaPagamento={formaPagamento}
                  troco={troco}
                />
              </div>
            )}
          </div>

          {/* Lado direito - Botões de ação */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {etapaAtual === 'produtos' ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelarVenda}
                  className="hidden sm:flex"
                  disabled={carregando || carrinho.length === 0}
                >
                  Cancelar
                </Button>
                
                <Button
                  variant="primary"
                  disabled={carrinho.length === 0 || carregando}
                  onClick={handleAvancarParaPagamento}
                  className="whitespace-nowrap"
                >
                  Avançar para Pagamento
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleVoltarParaProdutos}
                  className="hidden sm:flex"
                  disabled={carregando}
                >
                  Voltar
                </Button>
                
                <Button
                  variant="primary"
                  disabled={!formaPagamento || carregando}
                  onClick={() => setModalImprimir(true)}
                  className="whitespace-nowrap"
                >
                  Finalizar Venda
                </Button>
              </>
            )}
            
            {/* Ícones para mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={etapaAtual === 'produtos' ? cancelarVenda : handleVoltarParaProdutos}
              className="sm:hidden"
              title={etapaAtual === 'produtos' ? "Cancelar venda" : "Voltar para produtos"}
              disabled={carregando || (etapaAtual === 'produtos' && carrinho.length === 0)}
            >
              <X size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de edição do item */}
      {modalOpen === 'editar' && editItem && (
        <Modal
          isOpen={modalOpen === 'editar'}
          onClose={() => !carregando && setModalOpen(null)}
          title="Editar Item"
          content={
            <form
              onSubmit={e => {
                e.preventDefault();
                const quantidade = parseFloat((document.getElementById('editarQuantidade') as HTMLInputElement).value);
                const preco = parseFloat((document.getElementById('editarPreco') as HTMLInputElement).value);
                const justificativa = (document.getElementById('justificativaPreco') as HTMLInputElement).value;
                salvarEdicao(quantidade, preco, justificativa);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-label font-medium text-text-primary mb-2">
                  Quantidade:
                </label>
                <input
                  id="editarQuantidade"
                  type="number"
                  step="any"
                  min="0.001"
                  defaultValue={editItem.quantidade}
                  className="block w-full rounded-md border border-border bg-background-component placeholder-text-disabled text-text-primary p-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
                  required
                  disabled={carregando}
                />
              </div>
              <div>
                <label className="block text-label font-medium text-text-primary mb-2">
                  Preço:
                </label>
                <input
                  id="editarPreco"
                  type="number"
                  step="any"
                  min="0.01"
                  defaultValue={editItem.preco}
                  className="block w-full rounded-md border border-border bg-background-component placeholder-text-disabled text-text-primary p-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
                  required
                  disabled={carregando}
                />
              </div>
              <div>
                <label className="block text-label font-medium text-text-primary mb-2">
                  Justificativa (se alterar preço):
                </label>
                <input
                  id="justificativaPreco"
                  type="text"
                  defaultValue={editItem.justificativa || ''}
                  className="block w-full rounded-md border border-border bg-background-component placeholder-text-disabled text-text-primary p-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
                  disabled={carregando}
                />
              </div>
            </form>
          }
          footer={
            <div className="flex gap-3 justify-end">
              <Button 
                variant="ghost" 
                onClick={() => setModalOpen(null)}
                disabled={carregando}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary"
                onClick={() => {
                  const quantidade = parseFloat((document.getElementById('editarQuantidade') as HTMLInputElement).value);
                  const preco = parseFloat((document.getElementById('editarPreco') as HTMLInputElement).value);
                  const justificativa = (document.getElementById('justificativaPreco') as HTMLInputElement).value;
                  salvarEdicao(quantidade, preco, justificativa);
                }}
                disabled={carregando}
              >
                {carregando ? (
                  <div className="flex items-center gap-2">
                    <CircleNotch className="animate-spin" size={16} />
                    <span>Salvando...</span>
                  </div>
                ) : 'Salvar'}
              </Button>
            </div>
          }
        />
      )}

      {/* Modal de confirmação de finalização */}
      {modalImprimir && (
        <Modal
          isOpen={modalImprimir}
          onClose={() => !carregando && setModalImprimir(false)}
          title="Finalizar Venda"
          content={
            <div className="py-2">
              <p className="text-text-primary mb-4">
                Como você deseja finalizar esta venda?
              </p>
            </div>
          }
          footer={
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button 
                variant="ghost" 
                onClick={() => setModalImprimir(false)}
                disabled={carregando}
              >
                Cancelar
              </Button>
              <Button 
                variant="secondary"
                onClick={async () => {
                  setModalImprimir(false);
                  await handleFinalizarVenda(false); // Só finaliza, não imprime
                }}
                disabled={carregando}
              >
                {carregando ? (
                  <div className="flex items-center gap-2">
                    <CircleNotch className="animate-spin" size={16} />
                    <span>Processando...</span>
                  </div>
                ) : 'Finalizar sem Imprimir'}
              </Button>
              <Button 
                variant="primary"
                leftIcon={carregando ? <CircleNotch className="animate-spin" /> : <Printer size={18} />}
                onClick={async () => {
                  setModalImprimir(false);
                  await handleFinalizarVenda(true); // Finaliza e imprime
                }}
                disabled={carregando}
              >
                {carregando ? 'Processando...' : 'Finalizar e Imprimir'}
              </Button>
            </div>
          }
        />
      )}
    </div>
  );
};

export default Vendas;