import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { autenticado, carregando } = useAuth();

  if (carregando) return <div>Carregando...</div>;
  if (!autenticado) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute; 