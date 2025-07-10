import React from 'react';
import TabelaUsuarios from './components/TabelaUsuarios';
import { useUsuarios } from './hooks/useUsuarios';

const Usuarios: React.FC = () => {
  const { usuarios, page, setPage, total, totalPages, loading, feedback } = useUsuarios();

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-900 flex items-center gap-2">
        <span>👤</span> Usuários do Sistema
      </h2>
      {feedback && (
        <div className={`my-2 p-2 rounded text-center font-medium ${feedback.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {feedback}
        </div>
      )}
      <TabelaUsuarios
        usuarios={usuarios}
        page={page}
        setPage={setPage}
        total={total}
        totalPages={totalPages}
        loading={loading}
      />
    </div>
  );
};

export default Usuarios; 