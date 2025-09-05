import React from 'react';
import type { Usuario } from '../../config/types';

interface TabelaUsuariosProps {
  usuarios: Usuario[];
  page: number;
  setPage: (p: number) => void;
  total: number;
  totalPages: number;
  loading: boolean;
  onEditar: (usuario: Usuario) => void;
  onAtivar: (usuario: Usuario) => void;
  onInativar: (usuario: Usuario) => void;
  onExcluir: (usuario: Usuario) => void;
}

const TabelaUsuarios: React.FC<TabelaUsuariosProps> = ({ usuarios, page, setPage, total, totalPages, loading, onEditar, onAtivar, onInativar, onExcluir }) => (
  <div>
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-100 text-green-900">
            <th className="border p-2">Nome</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Perfil</th>
            <th className="border p-2">Ativo</th>
            <th className="border p-2">Criado em</th>
            <th className="border p-2">Atualizado em</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={7} className="text-center p-4">Carregando...</td></tr>
          ) : usuarios.length === 0 ? (
            <tr><td colSpan={7} className="text-center p-4">Nenhum usuário encontrado.</td></tr>
          ) : usuarios.map(u => (
            <tr key={u.id} className="hover:bg-green-50">
              <td className="border p-2">{u.nome}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.perfil === 'admin' ? 'Administrador' : 'Usuário'}</td>
              <td className="border p-2">{u.ativo ? 'Sim' : 'Não'}</td>
              <td className="border p-2">{new Date(u.createdAt).toLocaleDateString('pt-BR')}</td>
              <td className="border p-2">{new Date(u.updatedAt).toLocaleDateString('pt-BR')}</td>
              <td className="border p-2 flex gap-2">
                <button className="px-2 py-1 bg-blue-200 rounded hover:bg-blue-300" onClick={() => onEditar(u)}>Editar</button>
                {u.ativo ? (
                  <button className="px-2 py-1 bg-yellow-200 rounded hover:bg-yellow-300" onClick={() => onInativar(u)}>Inativar</button>
                ) : (
                  <button className="px-2 py-1 bg-green-200 rounded hover:bg-green-300" onClick={() => onAtivar(u)}>Ativar</button>
                )}
                <button className="px-2 py-1 bg-red-200 rounded hover:bg-red-300" onClick={() => onExcluir(u)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="flex justify-between items-center mt-4">
      <span className="text-sm text-gray-600">Página {page} de {totalPages} ({total} usuários)</span>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >Anterior</button>
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >Próxima</button>
      </div>
    </div>
  </div>
);

export default TabelaUsuarios; 