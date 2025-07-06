import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutBase from './layout/LayoutBase';
import VendasPage from './pages/VendasPage';
import ProdutosPage from './pages/ProdutosPage';
import HistoricoPage from './pages/HistoricoPage';

const App: React.FC = () => {
  return (
    <Router>
      <LayoutBase>
        <Routes>
          <Route path="/" element={<VendasPage />} />
          <Route path="/produtos" element={<ProdutosPage />} />
          <Route path="/historico" element={<HistoricoPage />} />
        </Routes>
      </LayoutBase>
    </Router>
  );
};

export default App;