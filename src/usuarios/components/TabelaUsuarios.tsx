import React from 'react';
import type { Usuario } from '../../config/types';

interface TabelaUsuariosProps {
  usuarios: Usuario[];
  page: number;
  setPage: (p: number) => void;
  total: number;
  totalPages: number;
  loading: boolean;
}

const TabelaUsuarios: React.FC<TabelaUsuariosProps> = ({ usuarios, page, setPage, total, totalPages, loading }) => (
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
            <th className="border p-2">Último login</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={6} className="text-center p-4">Carregando...</td></tr>
          ) : usuarios.length === 0 ? (
            <tr><td colSpan={6} className="text-center p-4">Nenhum usuário encontrado.</td></tr>
          ) : usuarios.map(u => (
            <tr key={u._id} className="hover:bg-green-50">
              <td className="border p-2">{u.nome}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role === 'admin' ? 'Administrador' : 'Usuário'}</td>
              <td className="border p-2">{u.ativo ? 'Sim' : 'Não'}</td>
              <td className="border p-2">{new Date(u.dataCriacao).toLocaleDateString('pt-BR')}</td>
              <td className="border p-2">{u.ultimoLogin ? new Date(u.ultimoLogin).toLocaleString('pt-BR') : '-'}</td>
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