import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import LayoutBase from './layout/LayoutBase';
import HistoricoPage from './pages/HistoricoPage';
import HomePage from './pages/HomePage';
import ProdutosPage from './pages/ProdutosPage';
import RelatorioPage from './pages/RelatorioPage';
import UsuariosPage from './pages/UsuariosPage';
import VendasPage from './pages/VendasPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><LayoutBase><HomePage /></LayoutBase></ProtectedRoute>} />
          <Route path="/vendas" element={<ProtectedRoute><LayoutBase><VendasPage /></LayoutBase></ProtectedRoute>} />
          <Route path="/produtos" element={<ProtectedRoute><LayoutBase><ProdutosPage /></LayoutBase></ProtectedRoute>} />
          <Route path="/usuarios" element={<ProtectedRoute><LayoutBase><UsuariosPage /></LayoutBase></ProtectedRoute>} />
          <Route path="/historico" element={<ProtectedRoute><LayoutBase><HistoricoPage /></LayoutBase></ProtectedRoute>} />
          <Route path="/relatorio" element={<ProtectedRoute><LayoutBase><RelatorioPage /></LayoutBase></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;