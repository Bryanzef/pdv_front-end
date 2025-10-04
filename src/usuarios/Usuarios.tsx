import React, { useState } from 'react';
import { Usuario } from '../config/types';
import TabelaUsuarios from './components/TabelaUsuarios';
import { useUsuarios } from './hooks/useUsuarios';
import Card from '../shared/components/ui/Card';
import Button from '../shared/components/ui/Button';
import Modal from '../shared/Modal';
import Input from '../shared/components/ui/Input';
import { UserPlus, PencilSimple, UserCirclePlus, UserCircleMinus, Trash } from 'phosphor-react';

const Usuarios: React.FC = () => {
  const { usuarios, page, setPage, total, totalPages, loading, adicionarUsuario, atualizarUsuario, ativar, inativar, remover } = useUsuarios();
  const [modalAberto, setModalAberto] = useState<'criar' | 'editar' | null>(null);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [confirmarExclusao, setConfirmarExclusao] = useState<Usuario | null>(null);

  // Estados para o formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [perfil, setPerfil] = useState<'usuario' | 'admin'>('usuario');
  const [senha, setSenha] = useState('');

  function handleEditar(usuario: Usuario) {
    setUsuarioSelecionado(usuario);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setPerfil(usuario.perfil as 'usuario' | 'admin');
    setSenha('');
    setModalAberto('editar');
  }
  
  function handleAtivar(usuario: Usuario) {
    ativar(usuario.id);
  }
  
  function handleInativar(usuario: Usuario) {
    inativar(usuario.id);
  }
  
  function handleExcluir(usuario: Usuario) {
    setConfirmarExclusao(usuario);
  }
  
  function handleConfirmarExclusao() {
    if (confirmarExclusao) remover(confirmarExclusao.id);
    setConfirmarExclusao(null);
  }
  
  function handleAbrirCriar() {
    setUsuarioSelecionado(null);
    setNome('');
    setEmail('');
    setPerfil('usuario');
    setSenha('');
    setModalAberto('criar');
  }
  
  function handleSalvarUsuario() {
    const dados = {
      nome,
      email,
      perfil,
      senha: senha || undefined // Se senha estiver vazia no modo editar, não enviar
    };
    
    if (modalAberto === 'criar') adicionarUsuario(dados);
    else if (modalAberto === 'editar' && usuarioSelecionado) atualizarUsuario(usuarioSelecionado.id, dados);
    
    setModalAberto(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-h1 font-bold text-text-primary">Usuários do Sistema</h1>
        
        <Button 
          variant="primary" 
          leftIcon={<UserPlus size={18} />}
          onClick={handleAbrirCriar}
        >
          Novo Usuário
        </Button>
      </div>
      
      <Card>
        <div className="flex items-center gap-2 mb-4 text-text-primary">
          <h2 className="text-h3 font-semibold">Lista de Usuários</h2>
          <span className="text-text-secondary">({total} usuários)</span>
        </div>
        
        <TabelaUsuarios
          usuarios={usuarios}
          page={page}
          setPage={setPage}
          total={total}
          totalPages={totalPages}
          loading={loading}
          onEditar={handleEditar}
          onAtivar={handleAtivar}
          onInativar={handleInativar}
          onExcluir={handleExcluir}
        />
      </Card>
      
      {/* Modal de criar/editar usuário */}
      <Modal
        isOpen={modalAberto !== null}
        onClose={() => setModalAberto(null)}
        title={modalAberto === 'criar' ? 'Novo Usuário' : 'Editar Usuário'}
        content={
          <div className="space-y-4">
            <Input
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome completo"
              required
              leftAddon={<PencilSimple size={18} className="text-text-secondary" />}
            />
            
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemplo.com"
              required
              leftAddon={<span className="text-text-secondary">@</span>}
            />
            
            <div>
              <label className="block text-label font-medium text-text-primary mb-2">
                Perfil
              </label>
              <select
                value={perfil}
                onChange={(e) => setPerfil(e.target.value as 'usuario' | 'admin')}
                className="block w-full rounded-md border border-border bg-background-component placeholder-text-disabled text-text-primary p-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
              >
                <option value="usuario">Usuário</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            
            <Input
              label={modalAberto === 'criar' ? "Senha" : "Senha (deixe em branco para não alterar)"}
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha segura"
              required={modalAberto === 'criar'}
              minLength={6}
            />
          </div>
        }
        footer={
          <div className="flex gap-3 justify-end">
            <Button 
              variant="ghost" 
              onClick={() => setModalAberto(null)}
            >
              Cancelar
            </Button>
            <Button 
              variant="primary"
              onClick={handleSalvarUsuario}
            >
              Salvar
            </Button>
          </div>
        }
      />
      
      {/* Modal de confirmação de exclusão */}
      <Modal
        isOpen={confirmarExclusao !== null}
        onClose={() => setConfirmarExclusao(null)}
        title="Excluir Usuário"
        content={
          confirmarExclusao && (
            <div className="py-2">
              <p className="text-text-primary mb-4">
                Tem certeza que deseja excluir o usuário <span className="font-semibold">{confirmarExclusao.nome}</span>?
              </p>
              <p className="text-danger text-sm">Esta ação não pode ser desfeita.</p>
            </div>
          )
        }
        footer={
          <div className="flex gap-3 justify-end">
            <Button 
              variant="ghost" 
              onClick={() => setConfirmarExclusao(null)}
            >
              Cancelar
            </Button>
            <Button 
              variant="danger"
              onClick={handleConfirmarExclusao}
              leftIcon={<Trash size={18} />}
            >
              Excluir
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default Usuarios; 