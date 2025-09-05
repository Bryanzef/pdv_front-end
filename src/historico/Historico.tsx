import { useEffect, useState } from 'react';
import api from '../config/api';
import Modal from '../shared/Modal';
import { getVendaPorId } from '../vendas/services/vendasApi';
import { gerarPdfVenda } from '../vendas/utils/pdfHelpers';

interface VendaHistorico {
  id: string;
  createdAt: string;
  total: string;
  metodoPagamento: string;
}

const Historico: React.FC = () => {
  const [vendas, setVendas] = useState<VendaHistorico[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalExcluir, setModalExcluir] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    api.get('/vendas/historico', { params: { page, limit: 10 } })
      .then((res) => {
        setVendas(res.data.vendas);
        setTotalPages(res.data.totalPages);
      })
      .catch(() => setFeedback('Erro ao carregar vendas'));
  }, [page]);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-900 flex items-center gap-2">
        <span>📈</span> Histórico de Vendas
      </h2>
      {feedback && (
        <div className={`my-2 p-2 rounded text-center font-medium ${feedback.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {feedback}
        </div>
      )}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-100 text-green-900">
              <th className="border p-2">Data</th>
              <th className="border p-2">Valor da Venda</th>
              <th className="border p-2">Forma de Pagamento</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map(v => (
              <tr key={v.id} className="hover:bg-green-50">
                <td className="border p-2">{new Date(v.createdAt).toLocaleString('pt-BR')}</td>
                <td className="border p-2">R$ {Number(v.total).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="border p-2">{v.metodoPagamento}</td>
                <td className="border p-2 text-center">
                  <button
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors font-semibold shadow"
                    title="Reimprimir Cupom"
                    onClick={async () => {
                      try {
                        const venda = await getVendaPorId(v.id);
                        const itens = venda.saleItems.map((item: any) => ({
                          nome: item.nome,
                          quantidade: item.quantidade,
                          preco: Number(item.preco),
                          tipo: item.product?.categoria || item.product?.tipo || 'un',
                          subtotal: Number(item.preco) * Number(item.quantidade)
                        }));
                        gerarPdfVenda(itens, Number(venda.total));
                      } catch (e) {
                        setFeedback('Erro ao reimprimir cupom');
                      }
                    }}
                  >
                    <i className="fas fa-print mr-1"></i>Reimprimir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >Anterior</button>
        <span className="px-2">Página {page} de {totalPages}</span>
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >Próxima</button>
      </div>
      <Modal
        isOpen={false}
        onClose={() => {}}
        title=""
        content=""
      />
    </div>
  );
};

export default Historico; 