import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { autenticado, carregando, usuario } = useAuth();

  // Mostrar loading enquanto verifica autenticação
  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Se não está autenticado, redirecionar para login
  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  // Se precisa de admin mas usuário não é admin
  if (requireAdmin && usuario?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center">
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Acesso Negado
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>Você não tem permissão para acessar esta página.</p>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => window.history.back()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  // Se está autenticado e tem as permissões necessárias, mostrar o conteúdo
  return <>{children}</>;
};

export default ProtectedRoute; 