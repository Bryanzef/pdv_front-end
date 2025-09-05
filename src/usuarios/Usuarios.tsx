import React, { useState } from 'react';
import { Usuario } from '../config/types';
import TabelaUsuarios from './components/TabelaUsuarios';
import { useUsuarios } from './hooks/useUsuarios';

const Usuarios: React.FC = () => {
  const { usuarios, page, setPage, total, totalPages, loading, adicionarUsuario, atualizarUsuario, ativar, inativar, remover } = useUsuarios();
  const [modalAberto, setModalAberto] = useState<'criar' | 'editar' | null>(null);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [confirmarExclusao, setConfirmarExclusao] = useState<Usuario | null>(null);

  function handleEditar(usuario: Usuario) {
    setUsuarioSelecionado(usuario);
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
    setModalAberto('criar');
  }
  function handleSalvarUsuario(dados: any) {
    if (modalAberto === 'criar') adicionarUsuario(dados);
    else if (modalAberto === 'editar' && usuarioSelecionado) atualizarUsuario(usuarioSelecionado.id, dados);
    setModalAberto(null);
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-900 flex items-center gap-2">
        <span>👤</span> Usuários do Sistema
      </h2>
      <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={handleAbrirCriar}>Novo Usuário</button>
      {/* Removido bloco de feedback visual, agora apenas toast */}
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
      {/* Modal de criar/editar usuário */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[350px]">
            <h3 className="text-xl font-bold mb-4">{modalAberto === 'criar' ? 'Novo Usuário' : 'Editar Usuário'}</h3>
            {/* Formulário simplificado */}
            <form onSubmit={e => { e.preventDefault(); const form = e.target as any; handleSalvarUsuario({ nome: form.nome.value, email: form.email.value, perfil: form.perfil.value, senha: form.senha.value }); }}>
              <input name="nome" defaultValue={usuarioSelecionado?.nome || ''} placeholder="Nome" className="block w-full mb-2 p-2 border rounded" required />
              <input name="email" type="email" defaultValue={usuarioSelecionado?.email || ''} placeholder="Email" className="block w-full mb-2 p-2 border rounded" required />
              <select name="perfil" defaultValue={usuarioSelecionado?.perfil || 'usuario'} className="block w-full mb-2 p-2 border rounded">
                <option value="usuario">Usuário</option>
                <option value="admin">Administrador</option>
              </select>
              <input name="senha" type="password" placeholder="Senha" className="block w-full mb-2 p-2 border rounded" minLength={6} required={modalAberto === 'criar'} />
              <div className="flex gap-2 justify-end mt-4">
                <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => setModalAberto(null)}>Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal de confirmação de exclusão */}
      {confirmarExclusao && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[350px]">
            <h3 className="text-xl font-bold mb-4">Excluir Usuário</h3>
            <p>Tem certeza que deseja excluir o usuário <b>{confirmarExclusao.nome}</b>?</p>
            <div className="flex gap-2 justify-end mt-4">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setConfirmarExclusao(null)}>Cancelar</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={handleConfirmarExclusao}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios; 