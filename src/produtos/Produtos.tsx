import React, { useState } from 'react';
import Modal from '../shared/Modal';
import FormularioProduto from './components/FormularioProduto';
import TabelaProdutos from './components/TabelaProdutos';
import { useProdutos } from './hooks/useProdutos';
import Card from '../shared/components/ui/Card';
import Button from '../shared/components/ui/Button';
import { Package, Plus, X } from 'phosphor-react';
import { Produto } from './types';

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

  const [showForm, setShowForm] = useState(false);

  // Abre o formulário e reseta os campos quando clicar em "Novo Produto"
  const handleNovoClick = () => {
    if (editandoId) {
      setNome('');
      setPreco('');
      setTipo('peso');
    }
    setShowForm(true);
  };

  // Abre o formulário quando for editar
  const handleEditarProduto = (produto: Produto) => {
    editarProduto(produto);
    setShowForm(true);
  };

  // Fecha o formulário
  const handleFecharForm = () => {
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho com botão de adicionar */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-h1 font-bold text-text-primary">Produtos</h1>
        
        <Button 
          variant="primary" 
          leftIcon={<Plus size={18} />}
          onClick={handleNovoClick}
        >
          Novo Produto
        </Button>
      </div>

      {/* Formulário em card */}
      {showForm && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-h3 font-semibold text-text-primary">
              {editandoId ? "Editar Produto" : "Novo Produto"}
            </h2>
            <button 
              onClick={handleFecharForm}
              className="text-text-secondary hover:text-text-primary"
            >
              <X size={18} />
            </button>
          </div>

          <FormularioProduto
            nome={nome}
            setNome={setNome}
            preco={preco}
            setPreco={setPreco}
            tipo={tipo}
            setTipo={setTipo}
            onSubmit={() => {
              cadastrarOuAtualizar();
              // Se não estiver editando, fechar o formulário após cadastrar
              if (!editandoId) setShowForm(false);
            }}
            editandoId={editandoId}
            estoque={editandoId ? produtos.find(p => p._id === editandoId)?.estoque : undefined}
            ativo={editandoId ? produtos.find(p => p._id === editandoId)?.ativo : undefined}
          />
        </Card>
      )}

      {/* Feedback */}
      {feedback && (
        <div className={`p-3 rounded-md text-center font-medium ${
          feedback.includes('sucesso') 
            ? 'bg-success/10 text-success' 
            : 'bg-danger/10 text-danger'
        }`}>
          {feedback}
        </div>
      )}

      {/* Tabela em card */}
      <Card>
        <div className="flex items-center gap-2 mb-4 text-text-primary">
          <Package size={20} />
          <h2 className="text-h3 font-semibold">Lista de Produtos</h2>
        </div>
        
        <TabelaProdutos
          produtos={produtos}
          filtro={filtro}
          setFiltro={setFiltro}
          editarProduto={handleEditarProduto}
          setModalExcluir={setModalExcluir}
          page={page}
          setPage={setPage}
          total={total}
          totalPages={totalPages}
        />
      </Card>

      {/* Modal de confirmação de exclusão */}
      <Modal
        isOpen={modalExcluir !== null}
        onClose={() => setModalExcluir(null)}
        title="Excluir Produto"
        content={
          <div>
            <p className="text-text-primary mb-4">
              Deseja realmente excluir este produto? Esta ação não pode ser desfeita.
            </p>
          </div>
        }
        footer={
          <div className="flex gap-3 justify-end">
            <Button 
              variant="ghost" 
              onClick={() => setModalExcluir(null)}
            >
              Cancelar
            </Button>
            <Button 
              variant="danger"
              onClick={excluirProduto}
            >
              Excluir
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default Produtos;