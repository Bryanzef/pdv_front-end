import { useState } from 'react';
import api from '../config/api';

interface Relatorio {
  totalVendas: number;
  totalItensKg: number;
  totalItensUn: number;
  valorTotal: number;
  formasPagamento: Record<string, number>;
}

const Relatorio: React.FC = () => {
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [relatorio, setRelatorio] = useState<Relatorio | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const gerarRelatorio = async () => {
    if (!inicio || !fim) {
      setFeedback('Selecione o período inicial e final.');
      return;
    }
    setLoading(true);
    setFeedback('');
    try {
      const res = await api.get('/vendas/relatorio', {
        params: { inicio, fim }
      });
      setRelatorio(res.data);
    } catch {
      setFeedback('Erro ao gerar relatório');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-900 flex items-center gap-2">
        <span>📊</span> Relatório de Vendas
      </h2>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Data Inicial:</label>
          <input type="date" value={inicio} onChange={e => setInicio(e.target.value)} className="border p-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Data Final:</label>
          <input type="date" value={fim} onChange={e => setFim(e.target.value)} className="border p-2 rounded" />
        </div>
        <button
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors font-semibold shadow self-end"
          onClick={gerarRelatorio}
          disabled={loading}
        >{loading ? 'Gerando...' : 'Gerar Relatório'}</button>
      </div>
      {feedback && <div className="my-2 p-2 rounded text-center font-medium bg-red-100 text-red-800">{feedback}</div>}
      {relatorio && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Resumo</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 p-4 rounded shadow">
              <div className="font-medium">Total de Vendas</div>
              <div className="text-2xl font-bold">{relatorio.totalVendas}</div>
            </div>
            <div className="bg-green-50 p-4 rounded shadow">
              <div className="font-medium">Valor Total Vendido</div>
              <div className="text-2xl font-bold">R$ {Number(relatorio.valorTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            </div>
            <div className="bg-green-50 p-4 rounded shadow">
              <div className="font-medium">Itens por Peso (kg)</div>
              <div className="text-2xl font-bold">{relatorio.totalItensKg} kg</div>
            </div>
            <div className="bg-green-50 p-4 rounded shadow">
              <div className="font-medium">Itens por Unidade</div>
              <div className="text-2xl font-bold">{relatorio.totalItensUn} un</div>
            </div>
          </div>
          <h3 className="text-lg font-bold mt-6 mb-2">Formas de Pagamento</h3>
          <ul className="mb-6">
            {Object.entries(relatorio.formasPagamento).map(([forma, valor]) => (
              <li key={forma} className="flex justify-between border-b py-1">
                <span className="capitalize">{forma}</span>
                <span>R$ {Number(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </li>
            ))}
          </ul>
          {/* Dashboard simples: gráfico de barras */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">Dashboard (Total por Forma de Pagamento)</h3>
            <div className="flex gap-4 items-end h-40">
              {Object.entries(relatorio.formasPagamento).map(([forma, valor]) => (
                <div key={forma} className="flex flex-col items-center justify-end h-full">
                  <div
                    className="bg-green-600 rounded-t w-10"
                    style={{ height: `${Math.max(10, valor / relatorio.valorTotal * 120)}px` }}
                    title={`R$ ${Number(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  ></div>
                  <span className="text-xs mt-1 capitalize">{forma}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Relatorio; 