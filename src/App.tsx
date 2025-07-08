import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LayoutBase from './layout/LayoutBase';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import VendasPage from './pages/VendasPage';
import ProdutosPage from './pages/ProdutosPage';
import HistoricoPage from './pages/HistoricoPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <LayoutBase>
                <VendasPage />
              </LayoutBase>
            </ProtectedRoute>
          } />
          <Route path="/produtos" element={
            <ProtectedRoute requireAdmin>
              <LayoutBase>
                <ProdutosPage />
              </LayoutBase>
            </ProtectedRoute>
          } />
          <Route path="/historico" element={
            <ProtectedRoute>
              <LayoutBase>
                <HistoricoPage />
              </LayoutBase>
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;