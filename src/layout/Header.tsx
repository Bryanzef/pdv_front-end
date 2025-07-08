import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { usuario, logout } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuAberto(false);
  };

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-8 sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Fruteira Sistema</h1>
      
      {usuario && (
        <div className="relative">
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-2"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {usuario.nome.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="hidden md:block text-sm font-medium">{usuario.nome}</span>
            <span className={`hidden md:block text-xs px-2 py-1 rounded-full ${
              usuario.role === 'admin' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {usuario.role === 'admin' ? 'Admin' : 'Usuário'}
            </span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuAberto && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                <p className="font-medium">{usuario.nome}</p>
                <p className="text-gray-500">{usuario.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
} 